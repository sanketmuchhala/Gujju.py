import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'content/docs')

export interface DocMeta {
  title: string
  description: string
  order: number
  slug: string
}

export interface Doc extends DocMeta {
  content: string
}

export function getDocBySlug(slug: string[]): Doc | null {
  try {
    const realSlug = slug.join('/')
    const fullPath = path.join(docsDirectory, `${realSlug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: realSlug,
      title: data.title || '',
      description: data.description || '',
      order: data.order || 0,
      content,
    }
  } catch (error) {
    return null
  }
}

export function getAllDocs(): DocMeta[] {
  const getDocsRecursively = (dir: string, basePath = ''): DocMeta[] => {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    const docs: DocMeta[] = []

    for (const item of items) {
      if (item.isDirectory()) {
        const nestedDocs = getDocsRecursively(
          path.join(dir, item.name),
          path.join(basePath, item.name)
        )
        docs.push(...nestedDocs)
      } else if (item.name.endsWith('.mdx')) {
        const slug = path.join(basePath, item.name.replace(/\.mdx$/, ''))
        const fullPath = path.join(dir, item.name)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        docs.push({
          slug,
          title: data.title || '',
          description: data.description || '',
          order: data.order || 0,
        })
      }
    }

    return docs.sort((a, b) => a.order - b.order)
  }

  return getDocsRecursively(docsDirectory)
}

export function getTableOfContents(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Array<{ level: number; text: string; id: string }> = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    headings.push({ level, text, id })
  }

  return headings
}