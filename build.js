const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(__dirname, 'assets');
const cssDir = path.join(__dirname, 'css');
const jsDir = path.join(__dirname, 'js');

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy files and directories
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distDir, 'index.html'));
fs.cpSync(publicDir, path.join(distDir, 'public'), { recursive: true });
fs.cpSync(assetsDir, path.join(distDir, 'assets'), { recursive: true });
fs.cpSync(cssDir, path.join(distDir, 'css'), { recursive: true });
fs.cpSync(jsDir, path.join(distDir, 'js'), { recursive: true });

console.log('Build complete!');
