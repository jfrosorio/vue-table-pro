import {mount} from '@vue/test-utils'
import SortButton from '@/components/VueTableProSortButton'

describe('Sort Button', () => {
  const wrapper = mount(SortButton)

  it('Has a span', () => {
    expect(wrapper.contains('span')).toBe(true)
  })

  it('Emits sort event onClick', () => {
    const input = wrapper.find('span')

    input.trigger('click')
    expect(wrapper.emitted('sort')).toBeTruthy()
  })
})
