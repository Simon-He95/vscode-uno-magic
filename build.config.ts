import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals: [
    'webpack',
    '@unocss/webpack',
    'vscode',
  ],
  rollup: {
    emitCJS: true,
  },
})
