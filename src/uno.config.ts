import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetWind from '@unocss/preset-wind'

export const defaultConfig = defineConfig<{}>({
  details: true,
  presets: [
    presetUno(),
    presetAttributify(),
    presetWind(),
  ],
})

export default async function getDefaultConfig(unoUri: string) {
  // todo: match shortcuts
  // const unoConfig = await fsp.readFile(unoUri, 'utf-8')
  const shortcuts: any = []

  return defineConfig({
    ...defaultConfig,
    presets: [
      ...defaultConfig.presets!,
      presetIcons({
        scale: 1.2,
      }),
      presetWebFonts({
        fonts: {
          sans: 'Inter:100,200,400,700,800',
          mono: 'IBM Plex Mono',
        },
      }),
    ],
    shortcuts,
    transformers: [
      transformerVariantGroup(),
      transformerDirectives(),
    ],
  })
}
