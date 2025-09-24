import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DocsLayout } from "@/components/docs-layout";

const navigation = [
  {
    title: "Getting Started",
    href: "/docs",
    items: [
      {
        title: "Introduction",
        href: "/docs"
      },
      {
        title: "Installation",
        href: "/docs/installation"
      },
      {
        title: "Quick Start",
        href: "/docs/quick-start"
      }
    ]
  },
  {
    title: "Language Guide",
    href: "/docs/language",
    items: [
      {
        title: "Syntax",
        href: "/docs/language/syntax"
      },
      {
        title: "Variables",
        href: "/docs/language/variables"
      },
      {
        title: "Functions",
        href: "/docs/language/functions"
      },
      {
        title: "Control Flow",
        href: "/docs/language/control-flow"
      }
    ]
  },
  {
    title: "Examples",
    href: "/docs/examples",
    items: [
      {
        title: "Hello World",
        href: "/docs/examples/hello-world"
      },
      {
        title: "Variables",
        href: "/docs/examples/variables"
      },
      {
        title: "Loops",
        href: "/docs/examples/loops"
      }
    ]
  }
];

export default function DocsLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container mx-auto flex-1">
        <DocsLayout navigation={navigation}>
          {children}
        </DocsLayout>
      </div>
      <SiteFooter />
    </div>
  );
}