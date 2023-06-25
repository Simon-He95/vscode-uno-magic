import { createAutocomplete } from '@unocss/autocomplete'
import { createGenerator } from '@unocss/core'
import getDefaultConfig from './uno.config'

const prettier = require('prettier')

export async function getUnoCompletions(unoUri: string) {
  const uno = createGenerator({}, await getDefaultConfig(unoUri))
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
  return Promise.all([...completions].map(async (item) => {
    const generate = await uno.generate(new Set([item]), { preflights: false, minify: true })
    const css = await formatCSS(generate.css)
    return [item, css]
  }))
}

export async function formatCSS(input: string) {
  return prettier.format(input, { printWidth: Infinity, parser: 'css' })
}
