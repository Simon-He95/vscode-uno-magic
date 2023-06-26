import { createAutocomplete } from '@unocss/autocomplete'
import { createGenerator } from '@unocss/core'
import getConfig from './uno.config'

const prettier = require('prettier')

const common = ['top', 'bottom', 'left', 'right', 'pt', 'pb', 'pl', 'pr', 'mt', 'mb', 'ml', 'mr', 'translate', 'translate-x', 'translate-y']
const hundredCommon = ['font']
const suppleMore = [
  'lh-loose',
  'lh-none',
  'lh-normal',
  'lh-relaxed',
  'lh-snug',
  'lh-tight',
  ...Array(10).fill(0).map((_, i) => `lh-${i}`),
  ...Array(10).fill(0).map((_, i) => `transition-${i}`),
  ...Array(10).fill(0).map((_, i) => `rotate-${i}`),
  ...common.reduce((result, item) => {
    result.push(...Array(10).fill(0).map((_, i) => `${item}-${i}`))
    return result
  }, [] as any),
  'font-mono',
  'font-serif',
  'font-sans',
  ...hundredCommon.reduce((result, item) => {
    result.push(...Array(9).fill(0).map((_, i) => `${item}-${i + 1}00`))
    return result
  }, [] as any),
]

export async function getUnoCompletions(unoUri: string) {
  const uno = createGenerator({}, await getConfig(unoUri))
  const ac = createAutocomplete(uno)

  async function enumerateAutocomplete() {
    const matched = new Set<string>()
    const a2z = Array.from('abcdefghijklmnopqrstuvwxyz')
    const a2zd = [...a2z, '-']

    const keys = a2z.flatMap(i => [
      i,
      ...a2zd.map(j => `${i}${j}`),
    ])
    await Promise.all(keys.map(key =>
      ac
        .suggest(key)
        .then((i) => {
          return i.forEach(j => matched.add(j))
        }),
    ))

    return matched
  }
  const completions = await enumerateAutocomplete()
  return Promise.all([...completions, ...suppleMore].map(async (item) => {
    const generate = await uno.generate(new Set([item]), { preflights: false, minify: true })
    const css = await formatCSS(generate.css)
    return [item, css]
  }))
}

export async function formatCSS(input: string) {
  return prettier.format(input, { printWidth: Infinity, parser: 'css' })
}
