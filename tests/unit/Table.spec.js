import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

import rows from './mock-data/rows.mock'

describe('Table', () => {
  let tableProps

  beforeEach(() => {
    tableProps = {
      rows,
      caption: "Cars List"
    }
  })
  
  it('does not exist without rows', () => {
    const wrapper = shallowMount(Table)
    expect(wrapper.html()).toBeUndefined()
  })

  it('renders the root element', () => {
    const wrapper = shallowMount(Table, { propsData: tableProps })

    expect(wrapper.html()).toContain('<div class="vuetable">')
  })

  it('has a caption', () => {
    const wrapper = shallowMount(Table, { propsData: tableProps })

    // Test if the caption exists
    expect(wrapper.contains('caption')).toBe(true)
    // Test if the caption text equals the tableTitle prop
    expect(wrapper.find('caption').text()).toBe('Cars List')
  })
})
