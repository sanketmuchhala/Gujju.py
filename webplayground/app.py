"""
KemLang Web Playground

A simple Flask app to run KemLang code in a web interface.
WARNING: This is for development/demo purposes only!
DO NOT deploy to production without proper sandboxing and security measures.
"""

import subprocess
import tempfile
import os
from pathlib import Path
from flask import Flask, render_template, request, jsonify
import sys

app = Flask(__name__)

# Timeout for code execution (seconds)
EXECUTION_TIMEOUT = 5

# Maximum input/output size
MAX_IO_SIZE = 1024


@app.route('/')
def index():
    """Serve the main playground page."""
    return render_template('index.html')


@app.route('/run', methods=['POST'])
def run_code():
    """Execute KemLang code and return the result."""
    try:
        data = request.get_json()
        if not data or 'code' not in data:
            return jsonify({'error': 'No code provided'}), 400

        code = data['code']
        user_input = data.get('input', '')

        # Basic input validation
        if len(code) > MAX_IO_SIZE:
            return jsonify({'error': 'Code too long'}), 400

        if len(user_input) > MAX_IO_SIZE:
            return jsonify({'error': 'Input too long'}), 400

        # Create temporary file for the code
        with tempfile.NamedTemporaryFile(mode='w', suffix='.kem', delete=False) as f:
            f.write(code)
            temp_file = f.name

        try:
            # Find the kem command - assume it's in PATH or try local installation
            kem_cmd = 'kem'

            # Try to use the local development version if available
            kemlang_dir = Path(__file__).parent.parent
            if (kemlang_dir / 'kemlang').exists():
                # Use python -m to run the local version
                cmd = [sys.executable, '-m', 'kemlang.cli', 'run-file', temp_file]
            else:
                # Use installed version
                cmd = [kem_cmd, 'run-file', temp_file]

            # Execute the code with timeout
            result = subprocess.run(
                cmd,
                input=user_input,
                text=True,
                capture_output=True,
                timeout=EXECUTION_TIMEOUT,
                cwd=kemlang_dir  # Set working directory for local imports
            )

            output = result.stdout
            error = result.stderr
            exit_code = result.returncode

            # Limit output size
            if len(output) > MAX_IO_SIZE:
                output = output[:MAX_IO_SIZE] + "\n... (output truncated)"

            if len(error) > MAX_IO_SIZE:
                error = error[:MAX_IO_SIZE] + "\n... (error truncated)"

            return jsonify({
                'output': output,
                'error': error,
                'exit_code': exit_code,
                'success': exit_code == 0
            })

        except subprocess.TimeoutExpired:
            return jsonify({
                'output': '',
                'error': f'Execution timed out after {EXECUTION_TIMEOUT} seconds',
                'exit_code': 124,
                'success': False
            })

        except FileNotFoundError:
            return jsonify({
                'output': '',
                'error': 'KemLang interpreter not found. Please install KemLang first.',
                'exit_code': 127,
                'success': False
            })

        finally:
            # Clean up temporary file
            try:
                os.unlink(temp_file)
            except OSError:
                pass

    except Exception as e:
        return jsonify({
            'output': '',
            'error': f'Internal error: {str(e)}',
            'exit_code': 1,
            'success': False
        }), 500


@app.route('/examples')
def get_examples():
    """Return example KemLang programs."""
    examples = {
        'hello': {
            'name': 'Hello World',
            'code': '''kem bhai
aa naam che bapu tame bolo
bhai bol "kem cho, " + naam + "!"
aavjo bhai''',
            'input': 'Sanket'
        },
        'loop': {
            'name': 'Loop and Conditionals',
            'code': '''kem bhai
aa i che 0
farvu {
  bhai bol i
  i che i + 1
  jo i == 5 { tame jao }
} jya sudhi i < 10

jo i == 5 {
  bhai bol "panch ma masti!"
} nahi to {
  bhai bol "kuch to gadbad chhe!"
}
aavjo bhai''',
            'input': ''
        },
        'arithmetic': {
            'name': 'Arithmetic Operations',
            'code': '''kem bhai
aa a che 10
aa b che 3

bhai bol "a = 10, b = 3"
bhai bol a + b
bhai bol a - b
bhai bol a * b
bhai bol a / b
bhai bol a % b

jo a > b {
    bhai bol "a is greater than b"
} nahi to {
    bhai bol "a is not greater than b"
}
aavjo bhai''',
            'input': ''
        }
    }
    return jsonify(examples)


if __name__ == '__main__':
    print("⚠️  WARNING: This is a development server!")
    print("   Do not use in production without proper security measures.")
    print("   KemLang code execution is not sandboxed.")
    print()

    # Check if KemLang is available
    try:
        result = subprocess.run(['kem', 'version'], capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            print(f"✓ KemLang found: {result.stdout.strip()}")
        else:
            print("✗ KemLang not found in PATH")
            print("  Install with: pip install -e .")
    except (subprocess.TimeoutExpired, FileNotFoundError):
        print("✗ KemLang not found in PATH")
        print("  Install with: pip install -e .")

    print()
    print("Starting KemLang Web Playground...")
    print("Open http://localhost:8080 in your browser")

    app.run(debug=True, host='0.0.0.0', port=8080)