import { describe, expect, it } from 'vitest'
import { transform } from '../src/transform'

describe('should', () => {
  it('exported', () => {
    expect(transform('class="bg-rgba(0, 0, 0) text-#fff"')).toMatchInlineSnapshot('"class=\\"bg-[rgba(0,0,0)] text-[#fff]\\""')
  })
})
