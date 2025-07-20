# Auto-Update System

This document explains the auto-update system implemented in the Project Time Track application.

## Overview

The auto-update system allows the application to automatically check for, download, and install updates without user intervention. It uses GitHub Releases as the distribution mechanism and `electron-updater` for the client-side functionality.

## Architecture

### Components

1. **Main Process (`main/background.ts`)**
   - Configures and initializes `electron-updater`
   - Handles update events and state management
   - Provides IPC handlers for renderer communication

2. **Renderer Process**
   - Update notification UI (`renderer/components/updates/UpdateNotification.tsx`)
   - Update state management hook (`renderer/hooks/useUpdates.ts`)
   - Integration with main layout

3. **GitHub Actions**
   - Automated release workflow (`.github/workflows/release.yml`)
   - Tag creation on version changes (`.github/workflows/release-tag.yml`)
   - Cross-platform builds (Windows, macOS, Linux)

4. **Configuration**
   - `electron-builder.yml` - Publishing configuration
   - `package.json` - Release scripts

## How It Works

### 1. Release Process

1. **Version Update**: Developer updates version in `package.json`
2. **Automatic Tagging**: GitHub Actions detects version change and creates a tag
3. **Build & Release**: Release workflow builds application for all platforms
4. **GitHub Release**: Binaries are published to GitHub Releases

### 2. Update Detection

1. **Startup Check**: App checks for updates on startup (production only)
2. **Periodic Checks**: Can be configured for periodic checking
3. **Manual Check**: Users can manually trigger update checks

### 3. Update Flow

1. **Update Available**: Notification shows with release information
2. **Download**: User can choose to download the update
3. **Install**: Once downloaded, user can restart to install
4. **Automatic Restart**: App restarts and applies the update

## User Interface

### Update Notification

The update notification appears in the top-right corner of the main window and includes:

- **Update Status**: Available, downloading, or ready to install
- **Version Information**: New version number and release notes
- **Progress Indicator**: Download progress bar
- **Action Buttons**: Download, install, or dismiss options

### States

1. **No Update**: "You're running the latest version"
2. **Update Available**: Show version and download option
3. **Downloading**: Progress bar with percentage
4. **Ready to Install**: Restart button to apply update

## Developer Usage

### Release a New Version

#### Method 1: Using the prepare-release script

```bash
# Prepare a new release
npm run prepare-release 1.7.1

# Push changes and tag
git push origin main
git push origin v1.7.1
```

#### Method 2: Manual process

```bash
# Update version in package.json
npm version 1.7.1

# Push the tag (GitHub Actions will handle the rest)
git push origin v1.7.1
```

### Build for Release

```bash
# Build without publishing
npm run build:release

# Build and publish to GitHub Releases
npm run release
```

### Testing Updates

1. **Development**: Auto-updates are disabled in development mode
2. **Production**: Create test releases with different version numbers
3. **Manual Testing**: Use the manual update check button

## Configuration

### electron-builder.yml

```yaml
publish:
  provider: github
  owner: supunlakmal
  repo: project-time-track
```

### Update Channels

- **Stable**: Main releases (default)
- **Beta**: Pre-release versions (can be configured)

### Security

- **Code Signing**: Can be configured for Windows and macOS
- **HTTPS**: All downloads use HTTPS from GitHub
- **Verification**: electron-updater verifies signatures

## Troubleshooting

### Common Issues

1. **Updates Not Detected**
   - Check GitHub Releases are published
   - Verify app is running in production mode
   - Check network connectivity

2. **Download Failures**
   - Check internet connection
   - Verify GitHub Release assets exist
   - Check firewall/proxy settings

3. **Install Failures**
   - Ensure app has write permissions
   - Check available disk space
   - Restart as administrator (Windows)

### Debugging

Enable debug logging by setting environment variable:
```bash
export DEBUG=electron-updater
```

### Logs

Check application logs for update-related messages:
- Windows: `%APPDATA%\\project-time-tracker\\logs`
- macOS: `~/Library/Logs/project-time-tracker`
- Linux: `~/.config/project-time-tracker/logs`

## API Reference

### IPC Methods

```typescript
// Check for updates
window.ipc.update.checkForUpdates()

// Download available update
window.ipc.update.downloadUpdate()

// Install downloaded update
window.ipc.update.installUpdate()

// Get current update info
window.ipc.update.getUpdateInfo()
```

### Events

```typescript
// Listen for update status changes
window.ipc.on('update-status', (updateInfo) => {
  // Handle update status
})
```

## Security Considerations

1. **GitHub Token**: Uses `GITHUB_TOKEN` for publishing
2. **Code Signing**: Recommended for production releases
3. **Update Verification**: electron-updater verifies update integrity
4. **HTTPS Only**: All update communication uses HTTPS

## Future Enhancements

1. **Update Channels**: Implement beta/stable channels
2. **Rollback**: Add ability to rollback updates
3. **Scheduling**: Configure update check frequency
4. **Notifications**: System notifications for updates
5. **Bandwidth Control**: Limit download speed/timing