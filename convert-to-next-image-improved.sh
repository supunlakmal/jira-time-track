#!/bin/bash

# Improved shell script to convert <img> tags to Next.js <Image> components
# Version 2.0: Uses Perl for robust multi-line matching.

echo "🔄 Converting <img> tags to Next.js <Image> components (Robust Version)..."

# --- Configuration ---
TEMPLATE_DIR="renderer/components/Template/src"
# ---------------------

# Check for Perl, as it's required for multi-line regex.
if ! command -v perl >/dev/null 2>&1; then
    echo "❌ Error: 'perl' command not found."
    echo "Perl is required for robust multi-line processing. Please install it to continue."
    exit 1
fi

# Function to process a single file
process_file() {
    local file="$1"
    echo "📝 Processing: $file"

    # --- 1. Add Image import if not already present ---
    # This grep pattern is more robust, handling different quote styles and spacing.
    if ! grep -q "import.*Image.*from.*['\"]next/image['\"]" "$file"; then
        echo "  ➕ Adding Next.js Image import..."
        
        # Find the last import line to add the new import after it.
        # This is a safe way to keep imports grouped together.
        last_import_line=$(grep -n "^import " "$file" | tail -1 | cut -d: -f1)
        
        if [ -n "$last_import_line" ]; then
            # Insert after the last import
            sed -i.bak "${last_import_line}a import Image from 'next/image';" "$file"
        else
            # Or, add at the top of the file if no imports exist
            sed -i.bak "1i import Image from 'next/image';" "$file"
        fi
    else
        echo "  ✓ Next.js Image import already exists."
    fi

    # --- 2. Convert <img> tags to <Image> components using Perl ---
    # Perl's -0777 switch reads the whole file, and the 's' regex flag allows '.' to match newlines.
    # This is critical for handling tags that span multiple lines.
    echo "  🔄 Converting <img> tags to <Image> components..."
    
    perl -i.bak -0777 -pe '
        # Step 1: Convert all <img> tags to a standardized, self-closing <Image /> component.
        # This handles <img...>, <img.../>, and <img...></img...> across multiple lines.
        # The `\b` ensures we match the whole word "img".
        # The `i` flag makes the match case-insensitive (e.g., <IMG>).
        # The `g` flag handles multiple tags in the file.
        # The `s` flag allows `.` to match newlines.
        s{<img\b([^>]*?)\s*/?>}{<Image$1 />}gis;
        s{</img>}{}gis; # Remove any lingering closing tags

        # Step 2: Now that all tags are <Image ... />, find any that are missing an `alt` attribute and add it.
        # We use a negative lookahead `(?!alt\s*=)` to ensure we only modify tags WITHOUT an alt attribute.
        # This prevents adding a second alt attribute.
        s{(<Image\b((?:(?!alt\s*=)[^>])*?)\s*/?>)}{
            my $tag_open = $1;
            my $attributes = $2;
            # Reconstruct the tag, inserting alt="" just before the closing slash.
            "<Image" . $attributes . " alt=\"\" />"
        }egis;
        
        # Step 3: Clean up any double spaces that might result from the replacement
        s{\s+/>}{ />}g;

    ' "$file"

    # Remove the backup files created by sed and perl
    rm -f "${file}.bak"

    echo "  ✅ Conversion completed for: $file"
}

# --- Main Execution ---

echo ""
echo "🔍 Scanning for files with <img> tags in '$TEMPLATE_DIR'..."

# Find all files with `<img>` tags first. This is more efficient.
# The `-l` flag to grep prints filenames only.
files_with_imgs=$(find "$TEMPLATE_DIR" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -exec grep -l -i "<img" {} +)

if [ -z "$files_with_imgs" ]; then
    echo "✅ No files with <img> tags found. Nothing to convert."
    exit 0
fi

# Use `wc -l` to count the lines (i.e., files) in the result.
total_files_with_imgs=$(echo "$files_with_imgs" | wc -l | xargs) # xargs trims whitespace

echo "📊 Found $total_files_with_imgs file(s) containing <img> tags."
echo ""

# Process each file found.
echo "$files_with_imgs" | while read -r file; do
    # The check below is technically redundant since we already filtered,
    # but it's a good safeguard and provides clear per-file output.
    if [[ -n "$file" ]]; then
        process_file "$file"
    fi
done

echo ""
echo "🎉 All identified files have been processed!"
echo ""
echo "📈 Summary:"
echo "   - Scanned directory: $TEMPLATE_DIR"
echo "   - Files modified: $total_files_with_imgs"
echo "   - All found <img> tags converted to <Image /> components."
echo "   - Added alt=\"\" attributes only where an alt attribute was missing."
echo "   - Handled tags spanning multiple lines."
echo ""
echo "⚠️  IMPORTANT NEXT STEPS:"
echo "1. The script added empty alt=\"\" for accessibility. Please review and add descriptive alt text."
echo "2. The Next.js <Image> component requires 'width' and 'height' props for static imports, or the 'fill' prop for responsive images."
echo "   You will need to add these props manually to fix errors in your application."
echo "3. Review the changes with 'git diff' and test your application thoroughly."
echo ""
echo "✨ Conversion script finished."