#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🧡 Installing KemLang...');

function checkPython() {
    try {
        // Try python3 first
        const pythonVersion = execSync('python3 --version', { encoding: 'utf8' });
        console.log(`✓ Found ${pythonVersion.trim()}`);
        return 'python3';
    } catch (e) {
        try {
            // Fallback to python
            const pythonVersion = execSync('python --version', { encoding: 'utf8' });
            console.log(`✓ Found ${pythonVersion.trim()}`);
            return 'python';
        } catch (e2) {
            console.error('❌ Python 3.10+ is required but not found');
            console.error('Please install Python from https://python.org');
            process.exit(1);
        }
    }
}

function checkPip() {
    try {
        execSync('pip --version', { encoding: 'utf8' });
        console.log('✓ pip is available');
        return 'pip';
    } catch (e) {
        try {
            execSync('pip3 --version', { encoding: 'utf8' });
            console.log('✓ pip3 is available');
            return 'pip3';
        } catch (e2) {
            console.error('❌ pip is required but not found');
            process.exit(1);
        }
    }
}

function installKemLang() {
    const python = checkPython();
    const pip = checkPip();

    console.log('📦 Installing KemLang via pip...');

    try {
        // Try to install from parent directory (if we're in the KemLang repo)
        const parentDir = path.join(__dirname, '..');
        if (fs.existsSync(path.join(parentDir, 'pyproject.toml'))) {
            console.log('📁 Installing from local source...');
            execSync(`${pip} install -e "${parentDir}"`, {
                stdio: 'inherit'
            });
        } else {
            // Install from source repository
            execSync(`${pip} install git+https://github.com/kemlang/kemlang.git`, {
                stdio: 'inherit'
            });
        }

        console.log('✓ KemLang installed successfully!');

        // Test installation
        try {
            const version = execSync('kem version', { encoding: 'utf8' });
            console.log(`✓ ${version.trim()}`);
            console.log('');
            console.log('🎉 Installation complete!');
            console.log('');
            console.log('Try these commands:');
            console.log('  kem version          # Show version');
            console.log('  kem repl             # Start interactive REPL');
            console.log('  echo "kem bhai\\nbhai bol \\"Hello!\\"\\naavjo bhai" > hello.kem');
            console.log('  kem run-file hello.kem    # Run a file');
            console.log('');
        } catch (e) {
            console.error('⚠️  Installation completed but kem command not found in PATH');
            console.error('You may need to restart your terminal or add pip install location to PATH');
        }

    } catch (error) {
        console.error('❌ Failed to install KemLang');
        console.error('Trying alternative installation...');

        try {
            // Fallback: install from parent directory
            const parentDir = path.join(__dirname, '..');
            execSync(`${pip} install -e "${parentDir}"`, { stdio: 'inherit' });
            console.log('✓ KemLang installed from local source!');
        } catch (e2) {
            console.error('❌ Installation failed');
            console.error('Please try manual installation:');
            console.error('  git clone https://github.com/kemlang/kemlang');
            console.error('  cd kemlang');
            console.error('  pip install -e .');
            process.exit(1);
        }
    }
}

function createBinScript() {
    const binDir = path.join(__dirname, 'bin');
    if (!fs.existsSync(binDir)) {
        fs.mkdirSync(binDir);
    }

    const binScript = path.join(binDir, 'kem');
    const script = `#!/usr/bin/env node
// KemLang NPM wrapper
const { spawn } = require('child_process');

const args = process.argv.slice(2);
const child = spawn('kem', args, { stdio: 'inherit' });

child.on('close', (code) => {
    process.exit(code);
});

child.on('error', (err) => {
    if (err.code === 'ENOENT') {
        console.error('❌ KemLang not found. Please run: npm install -g kemlang');
        process.exit(1);
    } else {
        console.error('Error:', err.message);
        process.exit(1);
    }
});
`;

    fs.writeFileSync(binScript, script);

    // Make executable on Unix systems
    if (os.platform() !== 'win32') {
        fs.chmodSync(binScript, '755');
    }
}

// Main installation
try {
    installKemLang();
    createBinScript();
} catch (error) {
    console.error('❌ Installation failed:', error.message);
    process.exit(1);
}