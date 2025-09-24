"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CodeSample } from "./code-sample";

const installMethods = [
  {
    id: "npm",
    label: "npm",
    install: "npm i -g kemlang",
    verify: "kem version"
  },
  {
    id: "pipx",
    label: "pipx",
    install: "pipx install kemlang",
    verify: "kem version"
  }
];

export function InstallTabs() {
  const [activeTab, setActiveTab] = useState("npm");

  const activeMethod = installMethods.find(method => method.id === activeTab);

  return (
    <div className="w-full">
      <div className="flex border-b border-border mb-4">
        {installMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setActiveTab(method.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === method.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {method.label}
          </button>
        ))}
      </div>

      {activeMethod && (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Install KemLang:</p>
            <CodeSample code={activeMethod.install} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Verify installation:</p>
            <CodeSample code={activeMethod.verify} />
          </div>
        </div>
      )}
    </div>
  );
}