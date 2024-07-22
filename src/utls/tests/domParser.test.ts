import { describe, it, expect } from 'vitest'
import { domParser } from "../domParser";

describe('Dom Parser', () => {
  it('should parse html string and return Document object', () => {
    const htmlString = '<!DOCTYPE html><html><head><title>Test</title></head><body><div>Test</div></body></html>'
    const doc = domParser(htmlString)
    const elem = doc.querySelector('div')
    expect(elem).not.toBeNull()
    expect(elem?.textContent).toBe('Test')
  })

  it('should handle empty string', () => {
    const htmlString = ''
    const doc = domParser(htmlString)
    const body = doc.querySelector('body')
    expect(body).not.toBeNull()
    expect(body?.textContent).toBe('')
  })
})
