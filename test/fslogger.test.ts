import DummyClass from '../src/index'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(
      new DummyClass({
        url: 'https://event-upload.51fubei.com/common/event/synEvent/json',
        scene: 'web'
      })
    ).toBeInstanceOf(DummyClass)
  })
})
