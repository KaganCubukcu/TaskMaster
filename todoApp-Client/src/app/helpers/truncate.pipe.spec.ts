import {TruncatePipe} from './truncate.pipe'

describe('TruncatePipe', () => {
  let pipe: TruncatePipe

  beforeEach(() => {
    pipe = new TruncatePipe()
  })

  it('pipe instance should be created', () => {
    expect(pipe).toBeTruthy()
  })

  it('should return empty string for empty string', () => {
    expect(pipe.transform('')).toBe('')
  })

  it('should return empty string for null', () => {
    expect(pipe.transform(null)).toBe('')
  })

  it('should return text as is if it is shorter than the limit', () => {
    expect(pipe.transform('Short text', 20)).toBe('Short text')
  })

  it('should truncate text longer than the limit and add "..."', () => {
    expect(pipe.transform('This is a very long text example', 10)).toBe('This is a...')
  })

  it('should use default limit (50) if limit is not specified', () => {
    const longText = 'A'.repeat(60)
    expect(pipe.transform(longText)).toBe('A'.repeat(50) + '...')
  })
})
