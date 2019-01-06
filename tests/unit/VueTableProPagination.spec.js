import { mount } from '@vue/test-utils'
import Pagination from '@/components/VueTableProPagination.vue'

import fewRows from './mock-data/pagination/few-rows.mock'
import lotsOfRows from './mock-data/pagination/lots-of-rows.mock'

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

  describe('With table data - 5 rows', () => {
    let wrapper
    beforeEach(() => {
      paginationProps = { ...paginationProps, $_vueTablePro_tableData: fewRows }
      wrapper = mount(Pagination, { propsData: paginationProps })
    })

    it('renders the root element', () => {
      expect(wrapper.classes()).toContain('vuetablepro__pagination')
    })

    describe('With insufficient rows to paginate', () => {
      it('gets hidden', () => {
        expect(wrapper.isVisible()).toBe(false)
      })
    })

    describe('With 0 rows per page', () => {
      it('throws invalid prop value', () => {
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})
        mount(Pagination, { propsData: { ...paginationProps, perPage: 0 } })
        expect(spy).toBeCalled()
        spy.mockRestore()
      })
    })

    describe('With 3 rows per page', () => {
      let wrapper
      beforeEach(() => {
        paginationProps = { ...paginationProps, perPage: 3 }
        wrapper = mount(Pagination, { propsData: paginationProps })
      })

      it('has pagination', () => {
        expect(wrapper.isVisible()).toBe(true)
      })

      it('has two pages', () => {
        expect(wrapper.findAll('.vuetablepro__pagination-page').length).toBe(2)
      })

      it('sets the second page as current upon click', () => {
        const secondPage = wrapper.findAll('.vuetablepro__pagination-page').at(1)
        secondPage.trigger('click')
        expect(secondPage.classes()).toContain('vuetablepro__pagination-page--current')
        expect(wrapper.vm.currentPage).toBe(2)
      })

      describe('With arrows enabled', () => {
        let wrapper
        beforeEach(() => {
          paginationProps = { ...paginationProps, arrows: true }
          wrapper = mount(Pagination, { propsData: paginationProps })
        })

        it('renders both "previous" and "next" arrows', () => {
          expect(wrapper.find('.vuetablepro__pagination-arrow--previous').exists()).toBe(true)
          expect(wrapper.find('.vuetablepro__pagination-arrow--next').exists()).toBe(true)
        })

        it('hides both "previous" and "next" arrows', () => {
          expect(wrapper.find('.vuetablepro__pagination-arrow--previous').isVisible()).toBe(false)
          expect(wrapper.find('.vuetablepro__pagination-arrow--next').isVisible()).toBe(false)
        })
      })
    })

    describe('With 10 rows per page', () => {
      let wrapper
      beforeEach(() => {
        paginationProps = { ...paginationProps, perPage: 10 }
        wrapper = mount(Pagination, { propsData: paginationProps })
      })

      it('has no pagination', () => {
        expect(wrapper.isVisible()).toBe(false)
      })
    })

    describe('With invalid pagination sizes', () => {
      describe('Size 0', () => {
        it('throws invalid prop value', () => {
          const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})
          mount(Pagination, { propsData: { ...paginationProps, size: 0 } })
          expect(spy).toBeCalled()
          spy.mockRestore()
        })
      })
      describe('Size 3', () => {
        it('throws invalid prop value', () => {
          const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})
          mount(Pagination, { propsData: { ...paginationProps, size: 3 } })
          expect(spy).toBeCalled()
          spy.mockRestore()
        })
      })
    })

    describe('With valid pagination sizes', () => {
      describe('Size 4', () => {
        let wrapper
        beforeEach(() => {
          paginationProps = { ...paginationProps, size: 4 }
          wrapper = mount(Pagination, { propsData: paginationProps })
        })

        it('has two pages', () => {
          expect(wrapper.findAll('.vuetablepro__pagination-page').length).toBe(2)
        })
      })
      describe('Size 20', () => {
        let wrapper
        beforeEach(() => {
          paginationProps = { ...paginationProps, size: 20 }
          wrapper = mount(Pagination, { propsData: paginationProps })
        })

        it('has two pages', () => {
          expect(wrapper.findAll('.vuetablepro__pagination-page').length).toBe(2)
        })
      })
    })
  })

  describe('With table data - 60 rows', () => {
    let wrapper
    beforeEach(() => {
      paginationProps = { ...paginationProps, size: 5, $_vueTablePro_tableData: lotsOfRows }
      wrapper = mount(Pagination, { propsData: paginationProps })
    })

    describe('With sufficient rows to paginate', () => {
      it('emits pagination on created', () => {
        expect(wrapper.emitted().pagination).toBeTruthy()
      })

      it('gets shown', () => {
        expect(wrapper.isVisible()).toBe(true)
      })
    })

    describe('With 5 rows per page and a size of 5', () => {
      let wrapper
      beforeEach(() => {
        paginationProps = { ...paginationProps, perPage: 5 }
        wrapper = mount(Pagination, { propsData: paginationProps })
      })

      it('has pagination', () => {
        expect(wrapper.isVisible()).toBe(true)
      })

      it('has 5 pages', () => {
        expect(wrapper.findAll('.vuetablepro__pagination-page').length).toBe(5)
      })

      it('sets the last page as current upon click', () => {
        const lastPage = wrapper.findAll('.vuetablepro__pagination-page').at(4)
        lastPage.trigger('click')
        expect(lastPage.classes()).toContain('vuetablepro__pagination-page--current')
        expect(wrapper.vm.currentPage).toBe(12)
      })

      describe('With arrows enabled', () => {
        let wrapper
        beforeEach(() => {
          paginationProps = { ...paginationProps, arrows: true }
          wrapper = mount(Pagination, { propsData: paginationProps })
        })

        it('renders both "previous" and "next" arrows', () => {
          expect(wrapper.find('.vuetablepro__pagination-arrow--previous').exists()).toBe(true)
          expect(wrapper.find('.vuetablepro__pagination-arrow--next').exists()).toBe(true)
        })

        it('hides "previous" arrow', () => {
          expect(wrapper.find('.vuetablepro__pagination-arrow--previous').isVisible()).toBe(false)
        })

        it('shows "next" arrow', () => {
          expect(wrapper.find('.vuetablepro__pagination-arrow--next').isVisible()).toBe(true)
        })

        it('shows "previous" arrow when there\'s more pages until the first', () => {
          const page = wrapper.findAll('.vuetablepro__pagination-page').at(3)
          page.trigger('click')
          expect(wrapper.find('.vuetablepro__pagination-arrow--previous').isVisible()).toBe(true)
        })

        it('hides "next" arrow when there\'s no more pages until the last', () => {
          const page = wrapper.findAll('.vuetablepro__pagination-page').at(4)
          page.trigger('click')
          expect(wrapper.find('.vuetablepro__pagination-arrow--next').isVisible()).toBe(false)
        })

        it('emits pagination when clicking the previous arrow', () => {
          const page = wrapper.findAll('.vuetablepro__pagination-page').at(3)
          const arrow = wrapper.find('.vuetablepro__pagination-arrow--next')
          page.trigger('click')
          expect(wrapper.emitted().pagination.length).toBe(2)
          arrow.trigger('click')
          expect(wrapper.emitted().pagination.length).toBe(3)
        })

        it('emits pagination when clicking the next arrow', () => {
          const arrow = wrapper.find('.vuetablepro__pagination-arrow--next')
          const currentEmitted = wrapper.emitted().pagination.length
          arrow.trigger('click')
          expect(wrapper.emitted().pagination.length).toBe(currentEmitted + 1)
        })
      })
    })

    describe('With 12 rows per page', () => {
      let wrapper
      beforeEach(() => {
        paginationProps = { ...paginationProps, perPage: 12 }
        wrapper = mount(Pagination, { propsData: paginationProps })
      })

      it('has pagination', () => {
        expect(wrapper.isVisible()).toBe(true)
      })

      it('has 5 pages', () => {
        expect(wrapper.findAll('.vuetablepro__pagination-page').length).toBe(5)
      })

      it('sets the last page as current upon click', () => {
        const lastPage = wrapper.findAll('.vuetablepro__pagination-page').at(4)
        lastPage.trigger('click')
        expect(lastPage.classes()).toContain('vuetablepro__pagination-page--current')
        expect(wrapper.vm.currentPage).toBe(5)
      })
    })
  })
})
