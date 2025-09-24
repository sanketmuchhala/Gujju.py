import Link from "next/link";
import { ArrowRight, Code, Zap, Heart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CodeSample } from "@/components/code-sample";
import { InstallTabs } from "@/components/install-tabs";

const codeExample = `kem bhai
aa naam che "Sanket"
bhai bol "kem cho, " + naam + "!"
aavjo bhai`;

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Familiar Syntax",
    description: "Write code using natural Gujarati keywords that feel intuitive and easy to understand."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fast & Simple",
    description: "Quick to learn and fast to execute. Focus on solving problems, not wrestling with syntax."
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Community Driven",
    description: "Built by and for the Gujarati developer community. Open source and welcoming to all."
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Code in{" "}
              <span className="text-primary">Gujarati</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              KemLang is a fun programming language that lets you code in Gujarati.
              Write programs using familiar words and natural syntax.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Try Playground
              </Link>
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  See it in action
                </h2>
                <p className="text-lg text-muted-foreground">
                  Here&apos;s a simple KemLang program that greets you in Gujarati
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <CodeSample code={codeExample} className="text-left" />
                <p className="text-center text-sm text-muted-foreground mt-4">
                  This program prints: &quot;kem cho, Sanket!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Quick Installation
              </h2>
              <p className="text-lg text-muted-foreground">
                Get started with KemLang in seconds
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <InstallTabs />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Why KemLang?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Programming in your mother tongue has never been this accessible
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to start coding?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the growing community of developers writing code in Gujarati
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Read Documentation
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Try Online
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}