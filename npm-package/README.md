# KemLang NPM Package

Easy installation of KemLang via npm, just like Bhailang!

## 🚀 Quick Install

```bash
npm install -g kemlang
```

That's it! KemLang is now available as `kem` command globally.

## 🧪 Usage

After installation, you can use KemLang anywhere:

```bash
# Check version
kem version

# Start interactive REPL
kem repl

# Run a file
echo "kem bhai
bhai bol \"Hello from KemLang!\"
aavjo bhai" > hello.kem

kem run-file hello.kem

# Format code
kem fmt hello.kem

# Show tokens
kem tokens hello.kem

# Show AST
kem ast hello.kem
```

## 📋 Requirements

- Node.js 14+ (for npm installation)
- Python 3.10+ (automatically installed via pip)

## 🔧 How It Works

This npm package is a wrapper that:

1. **Detects Python**: Finds Python 3.10+ on your system
2. **Installs KemLang**: Uses pip to install the Python package
3. **Creates Wrapper**: Provides `kem` command that calls the Python CLI

## 🆚 Installation Methods

### NPM (Recommended)
```bash
npm install -g kemlang
```

### Python/Pip (Direct)
```bash
pip install kemlang  # When published to PyPI
# or
git clone https://github.com/kemlang/kemlang
cd kemlang
pip install -e .
```

### From Source
```bash
git clone https://github.com/kemlang/kemlang
cd kemlang
npm install -g ./npm-package/
```

## 🐛 Troubleshooting

### "kem command not found"
1. Ensure Python 3.10+ is installed: `python3 --version`
2. Ensure pip is available: `pip --version`
3. Try reinstalling: `npm uninstall -g kemlang && npm install -g kemlang`

### Python not found
```bash
# macOS (Homebrew)
brew install python@3.11

# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3-pip

# Windows
# Download from python.org
```

### Permission issues
```bash
# Use sudo on macOS/Linux if needed
sudo npm install -g kemlang

# Or use npx for one-time usage
npx kemlang version
```

## 🧡 Language Quick Start

```kemlang
kem bhai
aa naam che bapu tame bolo
bhai bol "kem cho, " + naam + "!"

jo naam == "Sanket" {
    bhai bol "Hello creator!"
} nahi to {
    bhai bol "Nice to meet you!"
}
aavjo bhai
```

## 📚 Links

- **Documentation**: https://github.com/kemlang/kemlang
- **Web Playground**: http://localhost:8080 (when running locally)
- **Issues**: https://github.com/kemlang/kemlang/issues
- **VS Code Extension**: Available in `editor/kemlang-vscode/`

## 📄 License

MIT License - see [LICENSE](https://github.com/kemlang/kemlang/blob/main/LICENSE)