# 🚢 KemLang Shipping Guide

This document outlines how to ship KemLang to various package managers and platforms, making it accessible via multiple installation methods like Bhailang.

## 📦 Package Distribution Channels

### 1. 🟢 **NPM Package (Primary Distribution)**

**Status**: ✅ Ready to ship
**Command**: `npm install -g kemlang`

#### Shipping Steps:
```bash
# 1. Navigate to npm package
cd npm-package/

# 2. Login to npm (first time only)
npm login

# 3. Publish to npm registry
npm publish

# 4. Verify installation
npm install -g kemlang
kem version
```

#### Package Contents:
- `package.json` - NPM manifest with dependencies
- `install.js` - Python detection and pip installation
- `bin/kem` - Node.js wrapper for the Python CLI
- `README.md` - Installation and usage instructions

#### Features:
- ✅ Automatic Python 3.10+ detection
- ✅ Cross-platform support (Windows, macOS, Linux)
- ✅ Installs via pip under the hood
- ✅ Creates global `kem` command
- ✅ Fallback installation methods

---

### 2. 🐍 **PyPI Package (Python Distribution)**

**Status**: ⏳ Ready to ship (when PyPI account is set up)
**Command**: `pip install kemlang`

#### Shipping Steps:
```bash
# 1. Build the package
python -m build

# 2. Check the build
twine check dist/*

# 3. Upload to TestPyPI first (optional)
twine upload --repository testpypi dist/*

# 4. Upload to PyPI
twine upload dist/*

# 5. Verify installation
pip install kemlang
kem version
```

#### Package Contents:
- `pyproject.toml` - Modern Python packaging configuration
- `kemlang/` - Source code with CLI, interpreter, etc.
- `README.md` - Documentation
- `LICENSE` - MIT license

#### Features:
- ✅ Modern Python packaging (PEP 518)
- ✅ Console script entry point (`kem` command)
- ✅ Dependency management
- ✅ Type hints and mypy support

---

### 3. 🌐 **One-liner Install Script**

**Status**: ✅ Ready to ship
**Command**: `curl -fsSL https://kemlang.dev/install.sh | bash`

#### Hosting Requirements:
```bash
# Host the install.sh script at a public URL
# Options:
# 1. GitHub Pages: https://kemlang.github.io/install.sh
# 2. Custom domain: https://kemlang.dev/install.sh
# 3. GitHub raw: https://raw.githubusercontent.com/kemlang/kemlang/main/install.sh
```

#### Script Features:
- ✅ Colorful, user-friendly output
- ✅ Python and pip detection
- ✅ Handles system package management (brew, apt, etc.)
- ✅ Fallback installation methods
- ✅ Post-install verification and examples

---

### 4. 🍺 **Homebrew Formula (macOS/Linux)**

**Status**: ⏳ Future release
**Command**: `brew install kemlang`

#### Shipping Steps:
```bash
# 1. Create formula file
# kemlang.rb in homebrew-core or custom tap

# 2. Submit to homebrew-core (after project matures)
# Or create custom tap: brew tap kemlang/tap

# 3. Formula template:
class Kemlang < Formula
  desc "Gujarati-flavored programming language"
  homepage "https://github.com/kemlang/kemlang"
  url "https://github.com/kemlang/kemlang/archive/v0.1.0.tar.gz"
  sha256 "..."

  depends_on "python@3.11"

  def install
    virtualenv_install_with_resources
  end
end
```

---

### 5. 📱 **GitHub Releases**

**Status**: ✅ Ready to ship
**Platform**: GitHub Releases with pre-built binaries

#### Shipping Steps:
```bash
# 1. Create release tag
git tag v0.1.0
git push origin v0.1.0

# 2. Create GitHub release
gh release create v0.1.0 \
  --title "KemLang v0.1.0" \
  --notes "Initial release of KemLang interpreter"

# 3. Upload assets (optional)
# - Source tarball
# - Wheel files
# - VS Code extension VSIX
```

---

### 6. 🐳 **Docker Image**

**Status**: ⏳ Future release
**Command**: `docker run -it kemlang/kemlang`

#### Shipping Steps:
```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY . /app
RUN pip install -e .

ENTRYPOINT ["kem"]
CMD ["repl"]
```

```bash
# Build and push
docker build -t kemlang/kemlang:latest .
docker push kemlang/kemlang:latest
```

---

## 🚀 Shipping Checklist

### Pre-Release Checklist
- [ ] All tests passing (`pytest`)
- [ ] Linting clean (`ruff check`, `black --check`)
- [ ] Type checking clean (`mypy`)
- [ ] Documentation updated
- [ ] Version bumped in `kemlang/version.py`
- [ ] CHANGELOG.md updated
- [ ] Examples tested and working

### NPM Shipping Checklist
- [ ] `npm-package/package.json` version updated
- [ ] Install script tested on multiple platforms
- [ ] Node.js wrapper tested
- [ ] Dependencies verified
- [ ] README updated with install instructions
- [ ] Published to npm registry
- [ ] Installation tested: `npm install -g kemlang`

### PyPI Shipping Checklist
- [ ] `pyproject.toml` version updated
- [ ] Build artifacts clean: `python -m build`
- [ ] Package tested: `twine check dist/*`
- [ ] Uploaded to TestPyPI (optional)
- [ ] Uploaded to PyPI: `twine upload dist/*`
- [ ] Installation tested: `pip install kemlang`

### GitHub Release Checklist
- [ ] Tag created and pushed
- [ ] Release notes written
- [ ] Assets uploaded (source, wheels, etc.)
- [ ] Install script URL updated
- [ ] Documentation links updated

### Post-Release Checklist
- [ ] Installation tested from all channels
- [ ] Documentation updated with new version
- [ ] Community notified (if applicable)
- [ ] Issues/feedback monitored
- [ ] Next version planning

---

## 📊 Installation Analytics

Track installation success across channels:

| Channel | Command | Target Users | Status |
|---------|---------|--------------|---------|
| **NPM** | `npm install -g kemlang` | JS developers, quick setup | ✅ Ready |
| **PyPI** | `pip install kemlang` | Python developers | ⏳ Pending |
| **One-liner** | `curl ... \| bash` | Unix users, automation | ✅ Ready |
| **Homebrew** | `brew install kemlang` | macOS users | ⏳ Future |
| **GitHub** | Manual download | Developers, contributors | ✅ Ready |
| **Docker** | `docker run kemlang` | Containerized environments | ⏳ Future |

---

## 🔄 Version Management

### Semantic Versioning
- **Major** (1.0.0): Breaking changes, new language features
- **Minor** (0.1.0): New features, backward compatible
- **Patch** (0.1.1): Bug fixes, improvements

### Release Branches
- `main` - Stable releases
- `develop` - Development branch
- `release/v0.1.0` - Release preparation

### Automated Releases
Consider setting up GitHub Actions for automated releases:

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and publish to PyPI
        run: |
          python -m build
          twine upload dist/*
      - name: Create GitHub Release
        run: gh release create ${{ github.ref_name }}
```

---

## 🛠️ Troubleshooting Shipping Issues

### Common NPM Issues
- **Permissions**: Use `npm login` and ensure proper npm account
- **Version conflicts**: Bump version in `package.json`
- **Install failures**: Test install script on clean systems

### Common PyPI Issues
- **Build failures**: Check `pyproject.toml` syntax
- **Upload errors**: Verify credentials with `twine check`
- **Dependency conflicts**: Test in clean virtual environment

### Platform-Specific Issues
- **macOS**: Handle system package management (externally-managed-environment)
- **Windows**: Test install script in PowerShell and WSL
- **Linux**: Test on Ubuntu, CentOS, Arch distributions

---

## 📈 Success Metrics

Track these metrics after shipping:

- **Download counts** from npm, PyPI, GitHub
- **Installation success rate** from install script analytics
- **User feedback** from GitHub issues and discussions
- **Community adoption** through social media, blogs, etc.

---

## 🎯 Future Shipping Targets

### Language Package Managers
- **Chocolatey** (Windows): `choco install kemlang`
- **Scoop** (Windows): `scoop install kemlang`
- **Snap** (Linux): `snap install kemlang`
- **Flatpak** (Linux): `flatpak install kemlang`

### Development Tools
- **VS Code Marketplace**: Publish syntax extension
- **GitHub Codespaces**: Pre-configured development environment
- **Replit**: Template for online coding
- **CodeSandbox**: Browser-based development

### Cloud Platforms
- **Railway**: One-click deployment
- **Heroku**: Buildpack for KemLang apps
- **Vercel**: Serverless function support
- **Netlify**: Static site generation

---

**🧡 Happy Shipping! May KemLang reach developers everywhere!**