import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const knowledgeBaseRoot = process.env.KNOWLEDGE_BASE_ROOT

if (!knowledgeBaseRoot) {
  throw new Error('Please set KNOWLEDGE_BASE_ROOT to the root directory of your Obsidian knowledge base.')
}

const imports = [
  {
    name: '数据结构',
    source: path.join(knowledgeBaseRoot, '数据结构'),
    destination: path.join(workspaceRoot, 'docs', 'tech', 'data-structures')
  },
  {
    name: '数学',
    source: path.join(knowledgeBaseRoot, '数学'),
    destination: path.join(workspaceRoot, 'docs', 'tech', 'math')
  }
]

const calloutTypes = {
  abstract: 'info',
  summary: 'info',
  info: 'info',
  note: 'info',
  tip: 'tip',
  success: 'tip',
  important: 'warning',
  warning: 'warning',
  caution: 'warning',
  danger: 'danger',
  failure: 'danger',
  bug: 'danger',
  question: 'details',
  example: 'details',
  quote: 'details'
}

async function walkMarkdown(root) {
  const files = []

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    entries.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN', { numeric: true }))

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        await visit(fullPath)
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
        files.push(fullPath)
      }
    }
  }

  await visit(root)
  return files
}

function normalizeTarget(value) {
  return value.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\.md$/i, '')
}

function markdownHref(targetFile, currentFile, heading = '') {
  let relative = path.relative(path.dirname(currentFile.destinationFile), targetFile.destinationFile)
  relative = relative.split(path.sep).join('/')
  if (!relative.startsWith('.')) relative = `./${relative}`

  const encodedPath = relative
    .split('/')
    .map((segment) => (segment === '.' || segment === '..' ? segment : encodeURIComponent(segment)))
    .join('/')

  if (!heading) return encodedPath
  return `${encodedPath}#${encodeURIComponent(heading)}`
}

function convertCallouts(markdown) {
  const lines = markdown.split('\n')
  const output = []

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^>\s*\[!([A-Za-z]+)\][+-]?\s*(.*)$/)
    if (!match) {
      output.push(lines[index])
      continue
    }

    const originalType = match[1].toLowerCase()
    const containerType = calloutTypes[originalType] ?? 'info'
    const title = match[2].trim()
    output.push(`::: ${containerType}${title ? ` ${title}` : ''}`)

    while (index + 1 < lines.length && /^>/.test(lines[index + 1])) {
      index += 1
      output.push(lines[index].replace(/^> ?/, ''))
    }

    output.push(':::')
  }

  return output.join('\n')
}

function convertWikiLinks(markdown, currentFile, lookup, unresolved) {
  return markdown.replace(/(!?)\[\[([^\]]+)\]\]/g, (_match, embed, rawValue) => {
    const [rawTarget, rawAlias] = rawValue.split('|')
    const [targetWithoutHeading, heading = ''] = rawTarget.split('#')
    const normalizedTarget = normalizeTarget(targetWithoutHeading.trim())
    const basename = path.posix.basename(normalizedTarget)
    const display = (rawAlias || heading || basename).trim()

    const exactCandidates = lookup.byRelative.get(normalizedTarget.toLowerCase()) ?? []
    const basenameCandidates = lookup.byBasename.get(basename.toLowerCase()) ?? []
    const candidates = exactCandidates.length === 1 ? exactCandidates : basenameCandidates

    if (candidates.length === 1) {
      const href = markdownHref(candidates[0], currentFile, heading.trim())
      return `${embed ? '!' : ''}[${display}](${href})`
    }

    unresolved.push({
      from: currentFile.relativePath,
      target: rawTarget.trim(),
      reason: candidates.length > 1 ? 'ambiguous' : 'not-imported'
    })

    return embed ? `**附件未导入：${display}**` : `${display}（原知识库链接未导入）`
  })
}

function repairControlCharacters(markdown) {
  return markdown
    // Some generated source notes contain a form-feed character where `\\f` was intended.
    .replace(/\u000c(?=rac)/g, '\\f')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
}

const allFiles = []

for (const importGroup of imports) {
  const sourceFiles = await walkMarkdown(importGroup.source)
  for (const sourceFile of sourceFiles) {
    const relativePath = path.relative(importGroup.source, sourceFile)
    allFiles.push({
      group: importGroup.name,
      sourceRoot: importGroup.source,
      sourceFile,
      relativePath: relativePath.split(path.sep).join('/'),
      destinationFile: path.join(importGroup.destination, relativePath)
    })
  }
}

const lookup = {
  byRelative: new Map(),
  byBasename: new Map()
}

for (const file of allFiles) {
  const relativeKey = normalizeTarget(file.relativePath).toLowerCase()
  const basenameKey = path.basename(file.sourceFile, '.md').toLowerCase()

  if (!lookup.byRelative.has(relativeKey)) lookup.byRelative.set(relativeKey, [])
  lookup.byRelative.get(relativeKey).push(file)

  if (!lookup.byBasename.has(basenameKey)) lookup.byBasename.set(basenameKey, [])
  lookup.byBasename.get(basenameKey).push(file)
}

const unresolved = []
const imported = []
const skipped = []

for (const file of allFiles) {
  const source = (await readFile(file.sourceFile, 'utf8')).replace(/^\uFEFF/, '')

  if (!source.trim()) {
    skipped.push(file.relativePath)
    continue
  }

  let converted = convertWikiLinks(source, file, lookup, unresolved)
  converted = convertCallouts(converted)
  converted = repairControlCharacters(converted)
  converted = converted.replace(/\r\n/g, '\n')

  await mkdir(path.dirname(file.destinationFile), { recursive: true })
  await writeFile(file.destinationFile, converted, 'utf8')
  imported.push({ group: file.group, path: file.relativePath })
}

const counts = imported.reduce((result, item) => {
  result[item.group] = (result[item.group] ?? 0) + 1
  return result
}, {})

console.log(JSON.stringify({ counts, skipped, unresolved }, null, 2))
