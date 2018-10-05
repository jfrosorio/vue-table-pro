import { mount } from '@vue/test-utils'
import VueTablePro from '@/components/Features.vue'

describe('Tests for base table', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(VueTablePro, {
      propsData: {
        config: {
          headers: ['name', 'age']
        }
      }
    })
  })
  it('displays the correct number of headers', () => {
    expect(wrapper.vm.config.headers)
  })
})
