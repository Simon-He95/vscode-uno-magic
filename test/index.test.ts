import { describe, expect, it } from 'vitest'
import { transform } from '../src/transform'

describe('should', () => {
  it('exported', () => {
    expect(transform('class="bg-[rgba(0,0,0)] text-[#fff]"')).toMatchInlineSnapshot('"class=\\"bg-[rgba(0,0,0)] text-[#fff]\\""')
  })
  it('exported', () => {
    expect(transform('class="translate-x-[-1px]"')).toMatchInlineSnapshot('"class=\\"translate-x-[-1px]\\""')
  })
  it('exported', () => {
    expect(transform(`class=" 
    xxmaxw
    maxw-1
     xx-col col-x"`)).toMatchInlineSnapshot(`
       "class=\\" 
           xxmaxw
           max-w-1
            xx-col col-x\\""
     `)
  })
})
