import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Play } from "lucide-react";
import { CodeSample } from "@/components/code-sample";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to get started with KemLang - the Gujarati programming language.",
};

const quickStartCode = `kem bhai
aa naam che "KemLang"
bhai bol "Namaste, " + naam + "!"
aavjo bhai`;

export default function DocsPage() {
  return (
    <div className="prose prose-slate mx-auto max-w-4xl dark:prose-invert">
      <div className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Documentation
        </h1>
        <p className="text-xl text-muted-foreground">
          Welcome to KemLang! Learn how to write programs in Gujarati.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 not-prose mb-8">
        <Link
          href="/docs/installation"
          className="group rounded-lg border p-6 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <Download className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Installation</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Install KemLang on your system and start coding
          </p>
          <div className="flex items-center text-sm text-primary">
            Get started <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </Link>

        <Link
          href="/playground"
          className="group rounded-lg border p-6 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <Play className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Try Online</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Experiment with KemLang in your browser
          </p>
          <div className="flex items-center text-sm text-primary">
            Open playground <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </Link>
      </div>

      ## What is KemLang?

      KemLang is a programming language that lets you write code using Gujarati keywords and syntax. It&apos;s designed to be fun, educational, and accessible to Gujarati speakers who want to learn programming in their native language.

      ## Quick Example

      Here&apos;s a simple KemLang program:

      <div className="not-prose my-6">
        <CodeSample code={quickStartCode} />
      </div>

      This program:
      1. Starts with `kem bhai` (hello friend)
      2. Creates a variable `naam` with the value &quot;KemLang&quot;
      3. Prints a greeting message
      4. Ends with `aavjo bhai` (goodbye friend)

      ## Key Features

      - **Gujarati Keywords**: Use natural Gujarati words for programming constructs
      - **Familiar Syntax**: Easy-to-understand structure similar to other programming languages
      - **Interactive**: Run code in your browser or install locally
      - **Educational**: Perfect for learning programming concepts
      - **Community**: Built by and for the Gujarati developer community

      ## Getting Started

      Ready to start coding in KemLang? Here are your next steps:

      1. **[Install KemLang](/docs/installation)** - Set up KemLang on your computer
      2. **[Learn the Syntax](/docs/language/syntax)** - Understand the basic structure
      3. **[Try Examples](/docs/examples)** - See KemLang programs in action
      4. **[Use the Playground](/playground)** - Experiment with code online

      ## Need Help?

      - Check out our [examples](/docs/examples) for common programming patterns
      - Visit the [GitHub repository](https://github.com/sanketmuchhala/Gujju.py) to contribute or report issues
      - Read the [language guide](/docs/language/syntax) for detailed syntax information

      Let&apos;s start coding in Gujarati!
    </div>
  );
}