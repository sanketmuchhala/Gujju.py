# Contributing to KemLang

Thank you for your interest in contributing to KemLang! We welcome contributions from developers of all skill levels.

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or higher
- Git
- Basic understanding of programming language concepts

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/kemlang.git
   cd kemlang
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Development Dependencies**
   ```bash
   pip install -e ".[dev,test]"
   ```

4. **Set Up Pre-commit Hooks**
   ```bash
   pre-commit install
   ```

5. **Verify Installation**
   ```bash
   kem version
   pytest
   ```

## 🧪 Testing

We maintain high test coverage and use multiple testing approaches:

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=kemlang --cov-report=html

# Run specific test files
pytest tests/test_lexer.py
pytest tests/test_parser.py

# Run property-based fuzz tests
pytest tests/test_prop_fuzz.py -v
```

### Test Categories

- **Unit Tests**: `test_lexer.py`, `test_parser.py`, `test_exec.py`
- **Integration Tests**: `test_cli.py`, `test_fmt.py`
- **Property Tests**: `test_prop_fuzz.py` (using Hypothesis)

### Writing Tests

When adding new features:

1. Add unit tests for individual components
2. Add integration tests for CLI commands
3. Update property tests if needed
4. Ensure examples in documentation work

Example test structure:
```python
def test_new_feature():
    # Arrange
    source = 'kem bhai\n...\naavjo bhai'

    # Act
    result = run(source)

    # Assert
    assert result == expected_output
```

## 🎯 Types of Contributions

### 🐛 Bug Reports

Found a bug? Please create an issue with:

- **Clear title** describing the issue
- **Steps to reproduce** the bug
- **Expected vs actual behavior**
- **Environment info** (Python version, OS)
- **Sample code** that demonstrates the issue

### ✨ Feature Requests

Have an idea? We'd love to hear it! Please include:

- **Use case**: Why is this feature needed?
- **Proposed syntax**: How should it work?
- **Examples**: Show the feature in action
- **Alternatives considered**: Other approaches you thought about

### 🔧 Code Contributions

#### Small Changes
- Fix typos, improve documentation
- Add missing tests
- Improve error messages
- Performance optimizations

#### Medium Changes
- New CLI commands
- Formatter improvements
- Better error handling
- VS Code extension features

#### Large Changes
- New language features (keywords, operators)
- Major architectural changes
- New backends (transpilers, compilers)

## 📋 Development Workflow

### 1. Create an Issue
Before starting work, create an issue to discuss the change.

### 2. Create a Branch
```bash
git checkout -b feature/descriptive-name
# or
git checkout -b fix/issue-number
```

### 3. Make Changes
- Follow the code style (see below)
- Add tests for new functionality
- Update documentation as needed
- Keep commits focused and atomic

### 4. Test Your Changes
```bash
# Run tests
pytest

# Check code style
ruff check kemlang tests
black --check kemlang tests

# Type checking
mypy kemlang

# Test CLI manually
kem run examples/hello.kem
```

### 5. Commit Changes
```bash
git add .
git commit -m "feat: add new feature description"

# Follow conventional commits:
# feat: new features
# fix: bug fixes
# docs: documentation changes
# test: adding tests
# refactor: code refactoring
# style: code style changes
```

### 6. Push and Create PR
```bash
git push origin feature/descriptive-name
```

Then create a Pull Request on GitHub.

## 🎨 Code Style

### Python Code Style
We use automated tools to maintain consistent style:

```bash
# Auto-format code
black kemlang tests

# Lint code
ruff check kemlang tests --fix

# Type checking
mypy kemlang
```

### Coding Guidelines

#### General Principles
- **Clarity over cleverness**: Write code that's easy to understand
- **Consistent naming**: Use descriptive variable and function names
- **Minimal complexity**: Keep functions focused and small
- **Good error messages**: Help users understand what went wrong

#### KemLang-Specific Guidelines

1. **Parser/Lexer Changes**:
   - Update token types in `types.py`
   - Add comprehensive tests
   - Update grammar documentation

2. **New Keywords**:
   - Consider Gujarati authenticity
   - Ensure no conflicts with existing keywords
   - Update syntax highlighting
   - Add to documentation

3. **Error Messages**:
   - Include line/column information
   - Provide helpful suggestions
   - Test with `render_diagnostic`

#### Example Code Style

```python
# Good: Clear, descriptive names
def parse_while_statement(self) -> While:
    """Parse: farvu { ... } jya sudhi <expr>"""
    if not self.match(TokenType.LEFT_BRACE):
        self.error("Expected '{' after 'farvu'")

    body = self.block()
    # ... rest of implementation

# Bad: Unclear abbreviations
def parse_whl(self) -> While:
    if not self.match(TokenType.LB):
        self.error("Expected '{'")
```

### Documentation Style

- Use clear, concise language
- Include code examples
- Keep README examples working
- Document breaking changes

## 🏗️ Architecture Overview

Understanding KemLang's architecture helps with contributions:

```
kemlang/
├── lexer.py      # Tokenization with line/column tracking
├── parser.py     # Pratt parser producing AST
├── interpreter.py # Tree-walk interpreter
├── types.py      # AST nodes, tokens, data types
├── errors.py     # Error classes and diagnostics
├── fmt.py        # Code formatter
├── cli.py        # Command-line interface
└── version.py    # Version information
```

### Key Components

1. **Lexer**: Converts source code into tokens
2. **Parser**: Builds Abstract Syntax Tree (AST)
3. **Interpreter**: Executes AST nodes
4. **Formatter**: Pretty-prints KemLang code
5. **CLI**: User interface for all tools

### Adding New Language Features

1. **Lexer**: Add new token types
2. **Parser**: Add parsing rules
3. **AST**: Add new node types
4. **Interpreter**: Add execution logic
5. **Formatter**: Add formatting rules
6. **Tests**: Comprehensive test coverage

## 📚 Resources

### Learning Materials
- [Crafting Interpreters](https://craftinginterpreters.com/) - Excellent book on language implementation
- [Writing a Python Interpreter](https://docs.python.org/3/library/ast.html) - Python AST documentation
- [Pratt Parsers](https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html) - Parsing technique we use

### Tools We Use
- **Typer**: CLI framework
- **Rich**: Terminal formatting
- **Pytest**: Testing framework
- **Hypothesis**: Property-based testing
- **Ruff**: Fast Python linter
- **Black**: Code formatter
- **MyPy**: Type checking

## 🤔 Questions?

- **GitHub Discussions**: For general questions and ideas
- **GitHub Issues**: For bugs and specific feature requests
- **Code Review**: Ask questions in Pull Request comments

## 🎉 Recognition

Contributors are recognized in:
- GitHub contributor list
- Release notes for significant contributions
- Special mentions for outstanding work

Thank you for helping make KemLang better! 🧡