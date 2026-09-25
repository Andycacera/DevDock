import Fuse from 'fuse.js'

type SearchDocument<T> = {
  item: T
  value: string
}

type FuzzySearchOptions = {
  threshold?: number
}

export function fuzzySearch<T>(items: T[], query: string, options: FuzzySearchOptions = {}): T[] {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    return items
  }

  const { threshold = 0.35 } = options

  const documents: SearchDocument<T>[] = items.map(item => ({
    item,
    value: extractSearchableValues(item).join(' ')
  }))

  const fuse = new Fuse(documents, {
    keys: ['value'],
    threshold,
    ignoreLocation: true,
    shouldSort: true
  })

  return fuse.search(normalizedQuery).map(result => result.item.item)
}

function extractSearchableValues(value: unknown): string[] {
  if (typeof value === 'string') {
    return [value]
  }

  if (typeof value === 'number') {
    return [String(value)]
  }

  if (Array.isArray(value)) {
    return value.flatMap(extractSearchableValues)
  }

  if (value !== null && typeof value === 'object') {
    return Object.values(value).flatMap(extractSearchableValues)
  }

  return []
}
