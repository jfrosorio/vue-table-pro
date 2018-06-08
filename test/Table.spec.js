import { mount } from '@vue/test-utils'
import Table from '../src/components/Table.vue'

describe('Table', () => {
	
  test('is a Vue instance', () => {
	let wrapper = mount(Table)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  
  test('has a table element', () => {
	let wrapper = mount(Table)
    expect(wrapper.contains('table')).toBeTruthy()
  })
})