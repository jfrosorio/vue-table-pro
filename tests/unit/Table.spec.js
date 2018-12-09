import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

import rows from './mock-data/rows.mock'

describe('Table', () => {
  const wrapper = shallowMount(Table, {
    propsData: {
      rows
    }
  })

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="vuetable">')
  })

  it('has a caption', () => {
    expect(wrapper.contains('caption')).toBe(true)
  })
})
