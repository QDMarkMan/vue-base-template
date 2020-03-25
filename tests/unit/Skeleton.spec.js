import { shallowMount } from '@vue/test-utils'
import Skeleton from '../../src/components/Skeleton.vue'

describe('<skeleton/>', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Skeleton)
    expect(wrapper.find('.skeleton-component').text()).toEqual('Welcome to Skeleton');
  });
});