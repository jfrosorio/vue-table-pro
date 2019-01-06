import {mount} from '@vue/test-utils'
import Search from '@/components/VueTableProSearch'

describe('Search', () => {
  const wrapper = mount(Search)

  it('Has an input', () => {
    expect(wrapper.contains('input')).toBe(true)
  })

  it('Emits event onInput', done => {
    const input = wrapper.find('input')

    input.trigger('input')
    window.setTimeout(() => {
      expect(wrapper.emitted('search')).toBeTruthy()
      done()
    }, 300)
  })
})
