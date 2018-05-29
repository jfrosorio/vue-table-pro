import {mount} from 'vue-test-utils'
import Table from '../../src/components/Table.vue'
import expect from 'expect'


//This is cool stuff! To see more about using unit testing checkout vue-test-utils documentation: https://vue-test-utils.vuejs.org
//To test everything just use npm test

describe('Counter', () => {
	let wrapper;
	
	beforeEach(() => {
		wrapper = mount(Table)
	})
	
	it('defaults to a count of 0', () => {
		expect(wrapper.vm.count).toBe(0)
	})
	
	it('has a main div', () => {
		expect(wrapper.contains('div')).toBe(true)
	})
})
