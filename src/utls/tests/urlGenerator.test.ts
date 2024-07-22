import { describe, it, expect } from 'vitest'
import { urlGenerator } from '../urlGenerator'

describe('Test urlGenerator', () => {
  const url = 'https://infotrack-tests.infotrack.com.au/Google/'
    
  it('should generate URL with page number', () => {
    const expectedOutput = [
      'https://infotrack-tests.infotrack.com.au/Google/Page01.html',
      'https://infotrack-tests.infotrack.com.au/Google/Page02.html',
      'https://infotrack-tests.infotrack.com.au/Google/Page03.html'
    ]

    const result = urlGenerator(url, 3)
    expect(result).toEqual(expectedOutput)
  })
})
