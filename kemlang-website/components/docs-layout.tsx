"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";

interface DocsLayoutProps {
  children: React.ReactNode;
  navigation: Array<{
    title: string;
    href: string;
    items?: Array<{
      title: string;
      href: string;
    }>;
  }>;
}

export function DocsLayout({ children, navigation }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <h1 className="font-semibold">Documentation</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-accent"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block",
          sidebarOpen && "block"
        )}
      >
        {sidebarOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <div className="relative overflow-hidden h-full py-6 pr-6 lg:py-8 bg-background md:bg-transparent">
          <div className="h-full overflow-y-auto">
            <div className="w-full">
              {navigation.map((section) => (
                <div key={section.href} className="pb-4">
                  <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                    {section.title}
                  </h4>
                  {section.items && (
                    <div className="grid grid-flow-row auto-rows-max text-sm">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                          onClick={() => setSidebarOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0 px-4 md:px-0">
          {children}
        </div>
      </main>
    </div>
  );
}