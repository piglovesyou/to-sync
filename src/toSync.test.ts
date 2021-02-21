// @ts-ignore
import {mySyncFn} from './__fixtures/myFns.js'

describe('toSync.ts', () => {
  test('toSync', () => {
    expect(mySyncFn(1)).toBe(1000)
  })
})
