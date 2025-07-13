const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = './src'; // Change this to your project directory
const EXTENSIONS = ['.tsx', '.jsx', '.ts']; // File extensions to process
const EXCLUDED_DIRS = ['node_modules', '.next', 'dist', 'build', 'types', 'services']; // Directories to skip
const EXCLUDED_FILES = ['.d.ts']; // File extensions to skip
const EXCLUDED_FILENAMES = ['create-metadata.ts', 'constants.ts', 'page-constants.ts', 'rgb-to-hex.ts']; // Specific files to skip

// Counter for reporting
let stats = {
  processed: 0,
  modified: 0,
  skipped: 0,
  skippedDts: 0,
  skippedSpecific: 0,
  errors: 0
};

/**
 * Checks if a file should be excluded based on extension or filename
 */
function shouldExcludeFile(filePath) {
  // Check for excluded extensions
  if (EXCLUDED_FILES.some(ext => filePath.endsWith(ext))) {
    return 'extension';
  }
  
  // Check for specific excluded filenames
  const filename = path.basename(filePath);
  if (EXCLUDED_FILENAMES.includes(filename)) {
    return 'specific';
  }
  
  return false;
}

/**
 * Checks if a file already has the "use client" directive
 */
function hasUseClientDirective(content) {
  // Check for various forms of the directive
  return /["']use client["']/.test(content.slice(0, 100));
}

/**
 * Process a single file
 */
async function processFile(filePath) {
  try {
    stats.processed++;
    
    // Check if file should be excluded
    const exclusionReason = shouldExcludeFile(filePath);
    
    if (exclusionReason === 'extension') {
      console.info(`⏩ Skipping .d.ts file: ${filePath}`);
      stats.skippedDts++;
      return;
    } else if (exclusionReason === 'specific') {
      console.info(`⏩ Skipping specified file: ${filePath}`);
      stats.skippedSpecific++;
      return;
    }
    
    // Read file content
    const content = await fs.promises.readFile(filePath, 'utf8');
    
    // Skip if already has directive
    if (hasUseClientDirective(content)) {
      console.info(`✓ Already has directive: ${filePath}`);
      stats.skipped++;
      return;
    }
    
    // Add directive to the top of the file
    const updatedContent = `"use client"\n\n${content}`;
    
    // Write updated content back to the file
    await fs.promises.writeFile(filePath, updatedContent, 'utf8');
    
    console.info(`✅ Added "use client" to: ${filePath}`);
    stats.modified++;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Recursively walk a directory and process files
 */
async function walkDir(dirPath) {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip excluded directories
        if (EXCLUDED_DIRS.includes(entry.name)) {
          continue;
        }
        
        // Recursively process subdirectories
        await walkDir(fullPath);
      } else if (entry.isFile() && EXTENSIONS.includes(path.extname(entry.name))) {
        // Process files with matching extensions
        await processFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`❌ Error walking directory ${dirPath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Main function
 */
async function main() {
  console.info(`🔍 Adding "use client" directive to React components in ${ROOT_DIR}...`);
  console.info(`📂 Looking for files with extensions: ${EXTENSIONS.join(', ')}`);
  console.info(`⏩ Skipping files with extensions: ${EXCLUDED_FILES.join(', ')}`);
  console.info(`⏩ Skipping specific files: ${EXCLUDED_FILENAMES.join(', ')}`);
  
  const startTime = Date.now();
  
  try {
    await walkDir(ROOT_DIR);
    
    // Print summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.info('\n📊 Summary:');
    console.info(`✅ Modified: ${stats.modified} files`);
    console.info(`✓ Skipped (already had directive): ${stats.skipped} files`);
    console.info(`⏩ Skipped (.d.ts files): ${stats.skippedDts} files`);
    console.info(`⏩ Skipped (specified files): ${stats.skippedSpecific} files`);
    console.info(`❌ Errors: ${stats.errors}`);
    console.info(`⏱️ Time taken: ${duration} seconds`);
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
