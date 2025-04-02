const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if .env.local exists, if not create it from .env.example
const envLocalPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envLocalPath) && fs.existsSync(envExamplePath)) {
  console.log('Creating .env.local from .env.example');
  fs.copyFileSync(envExamplePath, envLocalPath);
}

// Run the build command
console.log('Building the project...');
try {
  execSync('next build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
