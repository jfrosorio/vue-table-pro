import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

import rows from './mock-data/rows.mock'

describe('Table', () => {
  let tableProps

  describe('Without rows', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

    it('does not render and throws console error', () => {
      const wrapper = shallowMount(Table)

      expect(wrapper.html()).toBeUndefined()
      expect(spy).toBeCalled()
      spy.mockRestore()
    })
  })

  describe('With rows', () => {
    beforeEach(() => {
      tableProps = {
        rows
      }
    })

    it('renders correctly', () => {
      const wrapper = shallowMount(Table, { propsData: tableProps })

      expect(wrapper.html()).toMatchSnapshot()
    })

    describe('With caption', () => {
      beforeEach(() => {
        tableProps = { ...tableProps, tableCaption: 'Cars List' }
      })

      it('exists and renders the caption text', () => {
        const wrapper = shallowMount(Table, { propsData: tableProps })

        expect(wrapper.contains('caption')).toBe(true)
        expect(wrapper.find('caption').text()).toBe('Cars List')
      })
    })
    
    describe('With expandable', () => {
      
      it('renders only with withColumns option', () => {
        const wrapper = shallowMount(Table, { propsData: tableProps })
        wrapper.setProps( { expandable: { withColumns: ['car_brand', 'car_model'] } } )
        expect(wrapper.html()).toContain('vuetable__expandable-panel')
      })
      
      it('renders only with attachFields option', () => {
        const wrapper = shallowMount(Table, { propsData: tableProps })
        expect(wrapper.html()).toContain('vuetable__expandable-panel')
      })
      
      it('expands row when clicked', () => {
        const wrapper = shallowMount(Table, { propsData: tableProps })
        wrapper.setProps( { expandable: { attachFields: { 'car_fuel': 'Fuel', 'car_color': 'Color' } } } )
        wrapper.find('.vuetable__expandable-toggler').trigger('click')
        expect(wrapper.find('.vuetable__expandable-toggler').classes()).toContain('is-active')
      })
    })
  })
})
