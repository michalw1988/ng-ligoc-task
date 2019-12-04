import React from "react"
import { shallow, mount } from "enzyme"
import Task from "./Task"
import { StateProvider } from '../../state/state'
import { initialState } from '../../state/initialState'

describe('Task', () => {
  it('renders correctly', () => {
    shallow(
      <StateProvider>
        <Task task={{}} />
      </StateProvider>
    )
  })

  it('renders task according to its properties', () => {
    const wrapper = mount(
      <StateProvider initialState={initialState} >
        <Task task={{
          id: 1,
          title: 'task title',
          description: 'task description',
          textColor: '#000',
          backgroundColor: '#fff',
        }} />
      </StateProvider>
    )
    expect(wrapper.find('h3').text()).toEqual('task title')
    expect(wrapper.find('.task').prop('style')).toHaveProperty('background', '#fff');
    expect(wrapper.find('.task').prop('style')).toHaveProperty('color', '#000');
  })

  it('has description hidden by default', () => {
    const wrapper = mount(
      <StateProvider initialState={initialState} >
        <Task task={{
          id: 1,
          title: 'task title',
          description: 'task description',
          textColor: '#000',
          backgroundColor: '#fff',
        }} />
      </StateProvider>
    )
    expect(wrapper.find('.task-description').length).toEqual(0)
  })

  it('can show and hide task description', () => {
    const wrapper = mount(
      <StateProvider initialState={initialState} >
        <Task task={{
          id: 1,
          title: 'task title',
          description: 'task description',
          textColor: '#000',
          backgroundColor: '#fff',
        }} />
      </StateProvider>
    )
    wrapper.find('.chevron').at(0).simulate('click')
    expect(wrapper.find('.task-description').length).toEqual(1)
    expect(wrapper.find('.task-description').text()).toEqual('task description')
    wrapper.find('.chevron').at(0).simulate('click')
    expect(wrapper.find('.task-description').length).toEqual(0)
  })

  it("don't show expand icon for tasks without description", () => {
    const wrapper = mount(
      <StateProvider initialState={initialState} >
        <Task task={{
          id: 1,
          title: 'task title',
          description: '',
          textColor: '#000',
          backgroundColor: '#fff',
        }} />
      </StateProvider>
    )
    expect(wrapper.find('.chevron').length).toEqual(0)
  })
})
