const fontMap: any = {
  100: 'thin',
  200: 'extralight',
  300: 'light',
  400: 'normal',
  500: 'medium',
  600: 'semibold',
  700: 'bold',
  800: 'extrabold',
  900: 'black',
}

const customMap: any = {
  'b': 'border',
  'bb': 'border-b',
  'border-rd': 'rounded',
  'lh': 'leading',
}

const textMap: any = {
  12: 'xs',
  14: 'sm',
  16: 'base',
  18: 'lg',
  20: 'xl',
  24: '2xl',
  30: '3xl',
  36: '4xl',
  48: '5xl',
  60: '6xl',
  72: '7xl',
  96: '8xl',
  128: '9xl',
}

const COMMON_REG = /(!|\s|hover:|focus:|active:|disabled:|invalid:|checked:|required:|first:|last:|odd:|even:|after:|before:|placeholder:|file:|marker:|selection:|first-line:|first-letter:|backdrop:|md:|sm:|xl:|2xl:|lg:|dark:|ltr:|rtl:|group-hover:|group-focus:|group-active:)(w|h|gap|m|mx|my|mt|mr|mb|ml|p|px|py|pt|pr|pb|pl|b|bt|br|bb|bl|lh|text|top|right|bottom|left|border-rd|border|max-w|max-h|translate-x|translate-y|duration|delay|scale-x|scale-y|scale|rotate|skew-x|skew-y|fill|stroke|invert|saturate|grayscale|contrast|brightness|blur|outline)-?(-?[0-9]+)(px|rem|em|\%|vw|vh||$)!?/g
export const rules: any = [
  ['maxh', 'max-h'],
  ['minh', 'min-h'],
  ['maxw', 'max-w'],
  ['minw', 'min-w'],
  ['translatex', 'translate-x'],
  ['translatey', 'translate-y'],
  [COMMON_REG, (_: string, prefix: string, v: string, v1 = '', v2 = '') => {
    if (v in customMap)
      v = customMap[v]
    if ((v === 'border-b' || v === 'border') && v1 === '1')
      return `${prefix}${v}`
    if (v === 'text' && (v2 === 'px' || v2 === '') && v1 in textMap)
      return `${prefix}${v}-${textMap[v1]}`
    return v2.trim() === ''
      ? `${prefix}${v}-${v1}${v2}`
      : `${prefix}${v}-[${v1}${v2}]`
  }],
  [/(bg|text|border)(\#[^\s\"]+)/g, (_: string, v: string, v1: string) => `${v}-[${v1}]`],
  [/([\s])border-box/, (_: string, v = '') => `${v}box-border`],
  [/([\s])content-box/, (_: string, v = '') => `${v}box-content`],
  [/-\[?\s*(rgba?\([^\)]*\))(\s*)\]?/g, (_: string, v: string, v1 = '') => `-[${v.replace(/\s*/g, '')}]${v1}`],
  [/-\[?\s*(calc\([^\)]*\))(\s*)\]?/g, (_: string, v: string, v1 = '') => `-[${v.replace(/\s*/g, '')}]${v1}`],
  [/-(\#[^\s\"]+)/g, (_: string, v: string) => `-[${v}]`],
  [/-([0-9]+(?:px)|(?:vw)|(?:vh)|(?:rem)|(?:em)|(?:%))([\s"])/g, (_: string, v: string, v1 = '') => `-[${v}]${v1}`],
  [/([\s!])x-hidden/, (_: string, v = '') => `${v}overflow-x-hidden`],
  [/([\s!])y-hidden/, (_: string, v = '') => `${v}overflow-y-hidden`],
  [/([\s!])justify-center/, (_: string, v = '') => `${v}justify-center`],
  [/([\s!])align-center/, (_: string, v = '') => `${v}items-center`],
  [/([\s!])hidden/, (_: string, v = '') => `${v}overflow-hidden`],
  [/([\s])eclipse/, (_: string, v = '') => `${v}whitespace-nowrap overflow-hidden text-ellipsis`],
  [/([\s])font-?(100|200|300|400|500|600|700|800|900)/, (_: string, prefix: string, v: string) => `${prefix}font-${fontMap[v]}`],
  [/([\s])pointer-none/, (_: string, v = '') => `${v}pointer-events-none`],
  [/([\s])pointer/, (_: string, v = '') => `${v}cursor-pointer`],
  [/([\s])flex-center/, (_: string, v = '') => `${v}justify-center items-center`],
  [/([\s])position-center/, (_: string, v = '') => `${v}left-0 right-0 top-0 bottom-0`],
  [/([\s])dashed/, (_: string, v = '') => `${v}border-dashed`],
  [/([\s])dotted/, (_: string, v = '') => `${v}border-dotted`],
  [/([\s])double/, (_: string, v = '') => `${v}border-double`],
  [/([\s])col/, (_: string, v = '') => `${v}flex-col`],
  [/([\s])contain/, (_: string, v = '') => `${v}bg-contain`],
  [/([\s])cover/, (_: string, v = '') => `${v}bg-cover`],
  [/([\s])line([0-9]+)/, (_: string, v = '', v1: string) => `${v}line-clamp-${v1}`],
]

export function transform(content: string) {
  return rules.reduce((result: string, cur: [string | RegExp, string]) => {
    const [reg, callback] = cur
    return result.replace(/class(Name)?="([^"]*)"/g, (_: string, name = '', value: string) => {
      const v = ` ${value}`
      const newClass = v.replace(reg, callback).slice(1)
      return `class${name}="${newClass}"`
    },
    )
  }, content)
}
