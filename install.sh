#!/bin/bash

# KemLang Installation Script
# Usage: curl -fsSL https://kemlang.dev/install.sh | bash

set -e

echo "🧡 KemLang Installer"
echo "===================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Python installation
check_python() {
    print_status "Checking Python installation..."

    if command_exists python3; then
        PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
        print_success "Found Python $PYTHON_VERSION"
        PYTHON_CMD="python3"
    elif command_exists python; then
        PYTHON_VERSION=$(python --version 2>&1 | awk '{print $2}')
        if [[ $PYTHON_VERSION == 3.* ]]; then
            print_success "Found Python $PYTHON_VERSION"
            PYTHON_CMD="python"
        else
            print_error "Python 3.10+ required, found Python $PYTHON_VERSION"
            exit 1
        fi
    else
        print_error "Python 3.10+ is required but not found"
        echo ""
        echo "Please install Python:"
        echo "  macOS: brew install python@3.11"
        echo "  Ubuntu: sudo apt install python3.11 python3-pip"
        echo "  Windows: Download from python.org"
        exit 1
    fi
}

# Check pip installation
check_pip() {
    print_status "Checking pip installation..."

    if command_exists pip3; then
        print_success "Found pip3"
        PIP_CMD="pip3"
    elif command_exists pip; then
        print_success "Found pip"
        PIP_CMD="pip"
    else
        print_error "pip is required but not found"
        echo ""
        echo "Please install pip:"
        echo "  curl https://bootstrap.pypa.io/get-pip.py | python3"
        exit 1
    fi
}

# Install KemLang
install_kemlang() {
    print_status "Installing KemLang..."

    # Try different installation methods with user flag for safety
    if [ -d ".git" ] && [ -f "pyproject.toml" ]; then
        # We're in the KemLang repository
        print_status "Installing from local source..."
        $PIP_CMD install --user -e . || $PIP_CMD install --break-system-packages -e .
    else
        # Install from GitHub
        print_status "Installing from GitHub repository..."
        $PIP_CMD install --user git+https://github.com/kemlang/kemlang.git || $PIP_CMD install --break-system-packages git+https://github.com/kemlang/kemlang.git
    fi
}

# Verify installation
verify_installation() {
    print_status "Verifying installation..."

    if command_exists kem; then
        VERSION=$(kem version 2>/dev/null || echo "unknown")
        print_success "KemLang installed successfully!"
        print_success "$VERSION"
    else
        print_warning "Installation completed but 'kem' command not found in PATH"
        print_warning "You may need to restart your terminal or update your PATH"

        # Try to find where it was installed
        PYTHON_PATH=$($PYTHON_CMD -c "import sys; print(':'.join(sys.path))" 2>/dev/null || echo "")
        if [[ $PYTHON_PATH == *"/.local/"* ]]; then
            print_warning "Try adding ~/.local/bin to your PATH:"
            echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
        fi
    fi
}

# Show usage examples
show_examples() {
    echo ""
    echo "🎉 Installation complete!"
    echo ""
    echo "Try these commands:"
    echo "  kem version              # Show version"
    echo "  kem repl                 # Start interactive REPL"
    echo ""
    echo "Create a hello.kem file:"
    echo "  echo 'kem bhai"
    echo "  aa naam che bapu tame bolo"
    echo "  bhai bol \"kem cho, \" + naam + \"!\""
    echo "  aavjo bhai' > hello.kem"
    echo ""
    echo "  kem run-file hello.kem   # Run the file"
    echo "  kem fmt hello.kem        # Format the code"
    echo ""
    echo "📚 Learn more: https://github.com/kemlang/kemlang"
    echo "🌐 Web playground: Run 'cd webplayground && python app.py'"
}

# Main installation flow
main() {
    # Check system requirements
    check_python
    check_pip

    # Install KemLang
    if install_kemlang; then
        verify_installation
        show_examples
    else
        print_error "Installation failed"
        echo ""
        echo "Please try manual installation:"
        echo "  git clone https://github.com/kemlang/kemlang"
        echo "  cd kemlang"
        echo "  pip install -e ."
        exit 1
    fi
}

# Run main function
main "$@"