import React from "react"
import { mount } from "enzyme"
import EditTaskModal from "./EditTaskModal"
import { StateProvider } from '../../state/state'
import { initialState } from '../../state/initialState'

describe('EditTaskModal', () => {

  it('fills modal fields with provided task data', () => {
    const wrapper = mount(
      <StateProvider initialState={initialState} >
        <EditTaskModal task={{
          id: 1,
          title: 'task title',
          description: 'task description',
          textColor: '#000',
          backgroundColor: '#fff',
        }} />
      </StateProvider>
    )
    expect(wrapper.find('input').props().value).toEqual('task title')
    expect(wrapper.find('textarea').props().value).toEqual('task description')
    expect(wrapper.find('.picker-button').at(0).prop('style')).toHaveProperty('background', '#fff');
    expect(wrapper.find('.picker-button').at(1).prop('style')).toHaveProperty('background', '#000');
  })
})
