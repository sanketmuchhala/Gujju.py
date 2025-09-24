# KemLang VS Code Extension

This extension provides syntax highlighting for KemLang (.kem) files in Visual Studio Code.

## Features

- Syntax highlighting for KemLang keywords, operators, strings, and numbers
- Recognition of .kem file extension
- Proper highlighting of Gujarati-flavored keywords like:
  - `kem bhai` / `aavjo bhai` (program fence)
  - `bhai bol` (print)
  - `bapu tame bolo` (input)
  - `aa ... che` (variable declaration/assignment)
  - `jo` / `nahi to` (if/else)
  - `farvu` / `jya sudhi` (while loop)
  - `tame jao` / `aagal vado` (break/continue)
  - `bhai chhe` / `bhai nathi` (true/false)

## Installation

### From VSIX (Local Development)

1. Clone the KemLang repository
2. Navigate to `editor/kemlang-vscode/`
3. Install dependencies: `npm install`
4. Package the extension: `npx vsce package`
5. Install in VS Code:
   - Open VS Code
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Run "Extensions: Install from VSIX..."
   - Select the generated `.vsix` file

### Manual Installation

1. Copy the `editor/kemlang-vscode` directory to:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\`
   - **macOS**: `~/.vscode/extensions/`
   - **Linux**: `~/.vscode/extensions/`
2. Restart VS Code

## Usage

1. Create a new file with `.kem` extension
2. VS Code will automatically apply KemLang syntax highlighting
3. Start coding in KemLang!

## Example

```kemlang
kem bhai
aa naam che bapu tame bolo
bhai bol "kem cho, " + naam + "!"

jo naam == "Sanket" {
    bhai bol "Hello, Sanket!"
} nahi to {
    bhai bol "Nice to meet you!"
}
aavjo bhai
```

## Development

To contribute to this extension:

1. Clone the repository
2. Navigate to `editor/kemlang-vscode/`
3. Run `npm install`
4. Press `F5` to launch a new Extension Development Host window
5. Test your changes with `.kem` files

## Language Reference

### Keywords

- **Program structure**: `kem bhai`, `aavjo bhai`
- **Output**: `bhai bol`
- **Input**: `bapu tame bolo`
- **Variables**: `aa`, `che`
- **Control flow**: `jo`, `nahi to`, `farvu`, `jya sudhi`
- **Loop control**: `tame jao`, `aagal vado`
- **Booleans**: `bhai chhe`, `bhai nathi`

### Operators

- **Arithmetic**: `+`, `-`, `*`, `/`, `%`
- **Comparison**: `==`, `!=`, `<`, `>`, `<=`, `>=`

### Comments

Comments are not yet supported in KemLang v0.1.

## License

MIT License - see the main KemLang repository for details.

## Issues

Report issues at: https://github.com/kemlang/kemlang/issues