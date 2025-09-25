import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by the{" "}
            <Link
              href="https://github.com/sanketmuchhala"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              KemLang Team
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/sanketmuchhala/Gujju.py"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/docs"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Documentation
          </Link>
          <Link
            href="/playground"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Playground
          </Link>
          <Link
            href="https://github.com/sanketmuchhala/Gujju.py"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}