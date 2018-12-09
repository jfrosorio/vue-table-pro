import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

import rows from './mock-data/rows.mock'

describe('Table', () => {
  let tableProps

  describe('Without rows', () => {
    it('does not render', () => {
      const wrapper = shallowMount(Table)

      expect(wrapper.html()).toBeUndefined()
    })
  })

  describe('With rows', () => {
    beforeEach(() => {
      tableProps = {
        rows
      }
    })

    it('exists and renders the root element', () => {
      const wrapper = shallowMount(Table, { propsData: tableProps })

      expect(wrapper.html()).toContain('<div class="vuetable">')
    })

    describe('With caption', () => {
      beforeEach(() => {
        tableProps = { ...tableProps, caption: 'Cars List' }
      })

      it('exists and renders the caption text', () => {
        const wrapper = shallowMount(Table, { propsData: tableProps })

        expect(wrapper.contains('caption')).toBe(true)
        expect(wrapper.find('caption').text()).toBe('Cars List')
      })
    })
  })
})
