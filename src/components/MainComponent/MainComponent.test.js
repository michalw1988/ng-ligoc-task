import React from "react";
import { shallow, mount } from "enzyme";
import MainComponent from "./MainComponent";
import { StateProvider } from '../../state/state'
import { reducer } from '../../state/reducer'
import { initialState } from '../../state/initialState'

describe('MainComponent', () => {
  it('renders correctly', () => {
    shallow(
      <StateProvider>
        <MainComponent />
      </StateProvider>
    )
  });

  it("initialy don't show any modal", () => {
    const wrapper = mount(
      <StateProvider initialState={{ tasks: [] }}>
        <MainComponent/>
      </StateProvider>
    );
    const modals = wrapper.find('.modal')
    expect(modals.length).toEqual(0)
  });

  it("initialy don't render any tasks", () => {
    const wrapper = mount(
      <StateProvider initialState={initialState}>
        <MainComponent/>
      </StateProvider>
    );
    const tasks = wrapper.find('.task')
    expect(tasks.length).toEqual(0)
    const infoMessage = wrapper.find('.info-message')
    expect(infoMessage.text()).toEqual('No tasks on the list. Use the buttom below to add some.')
  });

  it('can open a modal for adding new task', () => {
    const wrapper = mount(
      <StateProvider initialState={{ tasks: [] }}>
        <MainComponent/>
      </StateProvider>
    );
    wrapper.find('button#add-task-button').simulate('click')
    const modals = wrapper.find('.modal')
    expect(modals.length).toEqual(1)
  });

  it('can render tasks', () => {
    const wrapper = mount(
      <StateProvider initialState={{
        tasks: [
          {
            id: 1,
            title: 'task 1',
            description: 'description 1',
            textColor: '#000',
            backgroundColor: '#fff',
          },
          {
            id: 2,
            title: 'task 2',
            description: 'description 2',
            textColor: '#000',
            backgroundColor: '#fff',
          },
        ]
      }}>
        <MainComponent/>
      </StateProvider>
    );
    const tasks = wrapper.find('.task')
    expect(tasks.length).toEqual(2)
  });

  it('can add new task', () => {
    const wrapper = mount(
      <StateProvider initialState={{ tasks: [] }} reducer={reducer}>
        <MainComponent/>
      </StateProvider>
    );
    wrapper.find('button#add-task-button').simulate('click')
    wrapper.find('input').simulate('change', {
      target: { value: 'new task title' }
    })
    wrapper.find('button#add-button').simulate('click')
    const tasks = wrapper.find('.task')
    expect(tasks.length).toEqual(1)
    expect(tasks.at(0).find('h3').text()).toEqual('new task title')
  })

  it("can't add task without title", () => {
    const wrapper = mount(
      <StateProvider initialState={{ tasks: [] }} reducer={reducer}>
        <MainComponent/>
      </StateProvider>
    );
    wrapper.find('button#add-task-button').simulate('click')
    wrapper.find('input').simulate('change', {
      target: { value: '' }
    })
    wrapper.find('button#add-button').simulate('click')
    expect(wrapper.find('.validation-message').at(0).text()).toEqual('Please provide task title')
    const tasks = wrapper.find('.task')
    expect(tasks.length).toEqual(0)
  })

  it('can remove task', () => {
    const wrapper = mount(
      <StateProvider initialState={{
        tasks: [
          {
            id: 1,
            title: 'task 1',
            description: 'description 1',
            textColor: '#000',
            backgroundColor: '#fff',
          }
        ]
      }} reducer={reducer}>
        <MainComponent/>
      </StateProvider>
    );
    expect(wrapper.find('.task').length).toEqual(1)
    wrapper.find('.remove-icon').at(0).simulate('click')
    expect(wrapper.find('.task').length).toEqual(0)
  });

  it('can edit task', () => {
    const wrapper = mount(
      <StateProvider initialState={{
        tasks: [
          {
            id: 1,
            title: 'task title',
            description: 'task description',
            textColor: '#000',
            backgroundColor: '#fff',
          }
        ]
      }} reducer={reducer}>
        <MainComponent/>
      </StateProvider>
    );
    const tasks = wrapper.find('.task')
    expect(tasks.at(0).find('h3').text()).toEqual('task title')
    wrapper.find('.edit-icon').at(0).simulate('click')
    wrapper.find('input').simulate('change', {
      target: { value: 'edited task title' }
    })
    wrapper.find('button#confirm-button').simulate('click')
    expect(tasks.at(0).find('h3').text()).toEqual('edited task title')
  });

  // can edit task (description, colors)

  // cant remove task title
});
