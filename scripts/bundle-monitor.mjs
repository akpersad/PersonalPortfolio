#!/usr/bin/env node

/**
 * Bundle Size Monitoring Script
 * Monitors bundle size and alerts if it exceeds thresholds
 */

import fs from 'fs';
import path from 'path';

// Bundle size thresholds (in bytes)
const THRESHOLDS = {
  main: 250 * 1024, // 250KB
  vendor: 500 * 1024, // 500KB
  total: 1000 * 1024, // 1MB
};

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getBundleSize() {
  const buildDir = path.join(process.cwd(), '.next');

  if (!fs.existsSync(buildDir)) {
    console.error(
      `${colors.red}Build directory not found. Run 'npm run build' first.${colors.reset}`
    );
    process.exit(1);
  }

  const staticDir = path.join(buildDir, 'static');
  if (!fs.existsSync(staticDir)) {
    console.error(`${colors.red}Static directory not found.${colors.reset}`);
    process.exit(1);
  }

  let totalSize = 0;
  const chunks = {};

  // Walk through all files in the static directory
  function walkDir(dir, relativePath = '') {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const relativeFilePath = path.join(relativePath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath, relativeFilePath);
      } else if (stat.isFile()) {
        const size = stat.size;
        totalSize += size;

        // Categorize files
        if (file.endsWith('.js')) {
          if (file.includes('main') || file.includes('app')) {
            chunks.main = (chunks.main || 0) + size;
          } else if (file.includes('vendor') || file.includes('chunk')) {
            chunks.vendor = (chunks.vendor || 0) + size;
          } else {
            chunks.other = (chunks.other || 0) + size;
          }
        } else if (file.endsWith('.css')) {
          chunks.css = (chunks.css || 0) + size;
        } else {
          chunks.assets = (chunks.assets || 0) + size;
        }
      }
    });
  }

  walkDir(staticDir);

  return {
    total: totalSize,
    chunks,
  };
}

function checkThresholds(bundleInfo) {
  const violations = [];

  if (bundleInfo.chunks.main > THRESHOLDS.main) {
    violations.push({
      type: 'main',
      size: bundleInfo.chunks.main,
      threshold: THRESHOLDS.main,
      message: `Main bundle exceeded threshold: ${formatBytes(bundleInfo.chunks.main)} > ${formatBytes(THRESHOLDS.main)}`,
    });
  }

  if (bundleInfo.chunks.vendor > THRESHOLDS.vendor) {
    violations.push({
      type: 'vendor',
      size: bundleInfo.chunks.vendor,
      threshold: THRESHOLDS.vendor,
      message: `Vendor bundle exceeded threshold: ${formatBytes(bundleInfo.chunks.vendor)} > ${formatBytes(THRESHOLDS.vendor)}`,
    });
  }

  if (bundleInfo.total > THRESHOLDS.total) {
    violations.push({
      type: 'total',
      size: bundleInfo.total,
      threshold: THRESHOLDS.total,
      message: `Total bundle size exceeded threshold: ${formatBytes(bundleInfo.total)} > ${formatBytes(THRESHOLDS.total)}`,
    });
  }

  return violations;
}

function generateReport(bundleInfo, violations) {
  console.log(
    `${colors.bold}${colors.blue}📦 Bundle Size Report${colors.reset}\n`
  );

  console.log(
    `${colors.bold}Total Bundle Size:${colors.reset} ${formatBytes(bundleInfo.total)}`
  );
  console.log(
    `${colors.bold}Main Bundle:${colors.reset} ${formatBytes(bundleInfo.chunks.main || 0)}`
  );
  console.log(
    `${colors.bold}Vendor Bundle:${colors.reset} ${formatBytes(bundleInfo.chunks.vendor || 0)}`
  );
  console.log(
    `${colors.bold}CSS Bundle:${colors.reset} ${formatBytes(bundleInfo.chunks.css || 0)}`
  );
  console.log(
    `${colors.bold}Other Assets:${colors.reset} ${formatBytes(bundleInfo.chunks.assets || 0)}`
  );
  console.log(
    `${colors.bold}Other JS:${colors.reset} ${formatBytes(bundleInfo.chunks.other || 0)}\n`
  );

  if (violations.length > 0) {
    console.log(
      `${colors.red}${colors.bold}⚠️  Bundle Size Violations:${colors.reset}`
    );
    violations.forEach(violation => {
      console.log(`${colors.red}  • ${violation.message}${colors.reset}`);
    });
    console.log();

    console.log(
      `${colors.yellow}${colors.bold}💡 Recommendations:${colors.reset}`
    );
    console.log(
      `${colors.yellow}  • Use dynamic imports for large dependencies${colors.reset}`
    );
    console.log(
      `${colors.yellow}  • Implement code splitting for routes${colors.reset}`
    );
    console.log(
      `${colors.yellow}  • Remove unused dependencies${colors.reset}`
    );
    console.log(
      `${colors.yellow}  • Use tree shaking to eliminate dead code${colors.reset}`
    );
    console.log(
      `${colors.yellow}  • Consider lazy loading for non-critical components${colors.reset}\n`
    );

    return false;
  } else {
    console.log(
      `${colors.green}${colors.bold}✅ All bundle sizes are within acceptable limits!${colors.reset}\n`
    );
    return true;
  }
}

function saveReport(bundleInfo, violations) {
  const report = {
    timestamp: new Date().toISOString(),
    totalSize: bundleInfo.total,
    chunks: bundleInfo.chunks,
    thresholds: THRESHOLDS,
    violations: violations.map(v => ({
      type: v.type,
      size: v.size,
      threshold: v.threshold,
      message: v.message,
    })),
    withinThresholds: violations.length === 0,
  };

  const reportPath = path.join(process.cwd(), 'bundle-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(
    `${colors.blue}📄 Bundle report saved to: ${reportPath}${colors.reset}`
  );
}

function main() {
  console.log(
    `${colors.bold}${colors.blue}🔍 Analyzing bundle size...${colors.reset}\n`
  );

  try {
    const bundleInfo = getBundleSize();
    const violations = checkThresholds(bundleInfo);
    const withinThresholds = generateReport(bundleInfo, violations);
    saveReport(bundleInfo, violations);

    if (!withinThresholds) {
      process.exit(1);
    }
  } catch (error) {
    console.error(
      `${colors.red}Error analyzing bundle: ${error.message}${colors.reset}`
    );
    process.exit(1);
  }
}

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  getBundleSize,
  checkThresholds,
  generateReport,
  THRESHOLDS,
};
