import { shallowMount } from '@vue/test-utils'
import index from '@/page/index/index.vue'

describe('index.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(index, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
