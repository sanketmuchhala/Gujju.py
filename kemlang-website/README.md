# KemLang Website

A professional, minimal Next.js website for the KemLang programming language - a fun programming language that lets you code in Gujarati.

## Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Professional Design**: Clean, minimal typography inspired by modern technical documentation
- **Interactive Playground**: Monaco editor with simulated KemLang interpreter
- **Documentation Hub**: Comprehensive docs with MDX support and sidebar navigation
- **Dark Mode**: System-aware theme switching
- **SEO Optimized**: Sitemap, robots.txt, and OpenGraph meta tags
- **Responsive**: Mobile-first design that works on all devices

## Pages

- **Landing Page (`/`)**: Hero section, code sample, installation tabs, feature highlights
- **Documentation (`/docs`)**: Hub with sidebar navigation and getting started guide
- **Playground (`/playground`)**: Interactive code editor with Monaco and run functionality
- **Changelog (`/changelog`)**: Release notes and version history

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX for documentation
- **Editor**: Monaco Editor for playground
- **Theme**: next-themes for dark mode
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kemlang/kemlang-website.git
cd kemlang-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
kemlang-website/
├── app/                    # Next.js app router pages
│   ├── docs/              # Documentation pages
│   ├── playground/        # Interactive code playground
│   ├── changelog/         # Version history
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Landing page
├── components/            # Reusable React components
│   ├── site-header.tsx   # Navigation header
│   ├── site-footer.tsx   # Footer component
│   ├── code-sample.tsx   # Code display with copy
│   ├── install-tabs.tsx  # Installation method tabs
│   └── docs-layout.tsx   # Documentation layout
├── content/              # MDX documentation content
│   └── docs/            # Documentation files
├── lib/                 # Utility functions
│   ├── utils.ts        # Tailwind utilities
│   └── mdx.ts          # MDX processing
└── public/             # Static assets
```

## Key Components

### SiteHeader
Navigation bar with theme toggle and GitHub link.

### CodeSample
Syntax-highlighted code display with copy functionality.

### InstallTabs
Tabbed interface showing npm and pipx installation methods.

### DocsLayout
Documentation layout with responsive sidebar navigation.

## Code Sample

The landing page features this working KemLang example:

```jsk
kem bhai
aa naam che "Sanket"
bhai bol "kem cho, " + naam + "!"
aavjo bhai
```

## Installation Commands

The site promotes these installation methods:

### npm
```bash
npm i -g kemlang
kem version
```

### pipx
```bash
pipx install kemlang
kem version
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Visit the [documentation](https://kemlang.dev/docs) for usage guides
- Try the [playground](https://kemlang.dev/playground) to experiment with code
- Check the [GitHub repository](https://github.com/kemlang/kemlang) for the language implementation

---

Built with ❤️ for the Gujarati developer community.