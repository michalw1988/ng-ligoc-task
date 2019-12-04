import React from "react";
import { shallow, mount } from "enzyme";
import MainComponent from "./MainComponent";
import { StateProvider } from '../../state/state'
// import { reducer } from '../../state/reducer'
// import { initialState } from '../../state/initialState'

describe('MainComponent', () => {
  
  it('renders correctly', () => {
    shallow(
      <StateProvider>
        <MainComponent />
      </StateProvider>
    )
  });
});
