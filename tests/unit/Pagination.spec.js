import { mount } from '@vue/test-utils'
import Pagination from '@/components/Features/Pagination.vue'

import fewRows from './mock-data/pagination/few-rows.mock'

describe('Pagination', () => {
  let paginationProps

  describe('Without table data', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

    it('does not render and throws console error', () => {
      const wrapper = mount(Pagination)

      expect(wrapper.html()).toBeUndefined()
      expect(spy).toBeCalled()
      spy.mockRestore()
    })
  })

  describe('With table data', () => {
    beforeEach(() => {
      paginationProps = { ...paginationProps, tableData: fewRows }
    })

    it('renders ', () => {
      const wrapper = mount(Pagination, { propsData: paginationProps })
      console.log(wrapper.html())
      // expect(wrapper.html()).toBeUndefined())
    })
  })
})
