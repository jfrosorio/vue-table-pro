import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

import rows from './mock-data/rows.mock'

describe('Table', () => {
  it('does not exist without rows', () => {
    const wrapper = shallowMount(Table)
    expect(wrapper.html()).toBeUndefined()
  })

  it('renders the root element', () => {
    const wrapper = shallowMount(Table, {
      propsData: {
        rows,
        caption: 'Cars List'
      }
    })

    expect(wrapper.html()).toContain('<div class="vuetable">')
  })

  it('has a caption', () => {
    const wrapper = shallowMount(Table, {
      propsData: {
        rows,
        caption: 'Cars List'
      }
    })

    // Test if the caption exists
    expect(wrapper.contains('caption')).toBe(true)
    // Test if the caption text equals the tableTitle prop
    expect(wrapper.find('caption').text()).toBe('Cars List')
  })
})
