"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeSampleProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeSample({ code, language = "jsk", className }: CodeSampleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <pre className="rounded-lg border bg-muted p-4 overflow-x-auto text-sm">
        <code className="text-foreground font-mono">{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-background border opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}