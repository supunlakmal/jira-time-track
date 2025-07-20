#!/usr/bin/env node

/**
 * Release preparation script
 * Usage: node scripts/prepare-release.js [version]
 * Example: node scripts/prepare-release.js 1.7.1
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node scripts/prepare-release.js [version]');
    console.log('Example: node scripts/prepare-release.js 1.7.1');
    process.exit(1);
  }

  const version = args[0];
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  // Validate version format
  if (!/^\d+\.\d+\.\d+/.test(version)) {
    console.error('❌ Invalid version format. Use semantic versioning (e.g., 1.7.1)');
    process.exit(1);
  }

  try {
    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVersion = packageJson.version;
    
    console.log(`📦 Current version: ${currentVersion}`);
    console.log(`🎯 Target version: ${version}`);
    
    // Update package.json version
    packageJson.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    
    console.log('✅ Updated package.json version');
    
    // Stage the changes
    execSync('git add package.json', { stdio: 'inherit' });
    console.log('✅ Staged package.json changes');
    
    // Create version commit
    execSync(`git commit -m "chore: bump version to ${version}"`, { stdio: 'inherit' });
    console.log('✅ Created version commit');
    
    // Create git tag
    execSync(`git tag -a v${version} -m "Release v${version}"`, { stdio: 'inherit' });
    console.log(`✅ Created git tag v${version}`);
    
    console.log('\n🚀 Release preparation complete!');
    console.log('\nNext steps:');
    console.log(`1. Review the changes: git show v${version}`);
    console.log('2. Push the changes: git push origin main');
    console.log(`3. Push the tag: git push origin v${version}`);
    console.log('4. The GitHub Actions workflow will automatically build and release');
    
  } catch (error) {
    console.error('❌ Error preparing release:', error.message);
    process.exit(1);
  }
}

main();