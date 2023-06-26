import presetWind from '@unocss/preset-wind'
import presetAttributify from '@unocss/preset-attributify'
import presetMini from '@unocss/preset-mini'
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'

export const defaultConfig = {
  details: true,
  presets: [
    presetUno(),
    presetAttributify(),
    presetWind(),
    presetMini(),
  ],
}

export default {
  ...defaultConfig,
  presets: [
    ...defaultConfig.presets!,
    presetWebFonts({
      fonts: {
        sans: 'Inter:100,200,400,700,800',
        mono: 'IBM Plex Mono',
      },
    }),
  ],
  transformers: [
  ],
}
