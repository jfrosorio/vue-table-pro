import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

import rows from './mock-data/rows.mock'

describe('Table', () => {
  const wrapper = shallowMount(Table, {
    propsData: {
      rows
    }
  })


  it('renders the root element', () => {
    expect(wrapper.html()).toContain('<div class="vuetable">')
  })

  it('has a caption', () => {
    wrapper.setProps({ tableTitle: 'Cars List' })
    // Test if the caption exists
    expect(wrapper.contains('caption')).toBe(true)
    // Test if the caption text equals the tableTitle prop
    expect(wrapper.find('caption').text()).toBe('Cars List')
  })
})
