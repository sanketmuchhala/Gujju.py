"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Play, RotateCcw, Copy, Download } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import dynamic from "next/dynamic";

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted rounded-md">
      <div className="text-muted-foreground">Loading editor...</div>
    </div>
  ),
});

const defaultCode = `kem bhai
aa naam che "Sanket"
bhai bol "kem cho, " + naam + "!"
aavjo bhai`;

const examplePrograms = [
  {
    name: "Hello World",
    code: `kem bhai
aa naam che "World"
bhai bol "Hello, " + naam + "!"
aavjo bhai`
  },
  {
    name: "Variables",
    code: `kem bhai
aa number che 42
aa message che "The answer is: " + number
bhai bol message
aavjo bhai`
  },
  {
    name: "Simple Math",
    code: `kem bhai
aa a che 10
aa b che 5
aa sum che a + b
bhai bol "Sum: " + sum
aavjo bhai`
  }
];

export default function PlaygroundPage() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      // Simulate API call to run KemLang code
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock output based on the code
      if (code.includes('bhai bol')) {
        const matches = code.match(/bhai bol (.+)/g);
        if (matches) {
          const outputs = matches.map(match => {
            const content = match.replace('bhai bol ', '').replace(/"/g, '');
            // Simple variable substitution
            let result = content;
            const nameMatch = code.match(/aa naam che "([^"]+)"/);
            if (nameMatch && content.includes('naam')) {
              result = result.replace(/naam/g, nameMatch[1]);
            }
            const numberMatch = code.match(/aa number che (\d+)/);
            if (numberMatch && content.includes('number')) {
              result = result.replace(/number/g, numberMatch[1]);
            }
            return result.replace(/ \+ /g, '');
          });
          setOutput(outputs.join('\n'));
        }
      } else {
        setOutput("Program executed successfully (no output)");
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput("");
  };

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setOutput("");
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "program.jsk";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">KemLang Playground</h1>
          <p className="text-muted-foreground">
            Write and run KemLang code in your browser. Try the examples or write your own!
          </p>
        </div>

        {/* Example Programs */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Example Programs</h3>
          <div className="flex flex-wrap gap-2">
            {examplePrograms.map((example, index) => (
              <button
                key={index}
                onClick={() => loadExample(example.code)}
                className="px-3 py-1 text-sm rounded-md border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
          {/* Code Editor */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Code Editor</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyCode}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  title="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={downloadCode}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  title="Download code"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={resetCode}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  title="Reset code"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 border rounded-md overflow-hidden">
              <MonacoEditor
                height="100%"
                defaultLanguage="plaintext"
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollbar: {
                    vertical: "auto",
                    horizontal: "auto",
                  },
                }}
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
              >
                {isRunning ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-3">Output</h3>
            <div className="flex-1 border rounded-md bg-muted/50 p-4 font-mono text-sm overflow-auto">
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="text-muted-foreground italic">
                  Click &quot;Run Code&quot; to see output here...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-6 border rounded-lg bg-muted/30">
          <h3 className="text-lg font-semibold mb-3">Quick Reference</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Basic Structure</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>kem bhai</code> - Start program</li>
                <li><code>aavjo bhai</code> - End program</li>
                <li><code>bhai bol</code> - Print output</li>
                <li><code>aa ... che</code> - Declare variable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Examples</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>aa naam che &quot;Sanket&quot;</code> - String variable</li>
                <li><code>aa number che 42</code> - Number variable</li>
                <li><code>bhai bol naam</code> - Print variable</li>
                <li><code>bhai bol &quot;Hello!&quot;</code> - Print text</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>Note:</strong> This playground uses a simulated KemLang interpreter for demonstration purposes.
            For the full language features, please install KemLang locally.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}