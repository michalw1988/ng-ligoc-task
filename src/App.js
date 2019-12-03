import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent/MainComponent';
import { StateProvider } from './state/state';
import { reducer } from './state/reducer';

function App() {
  const initialState = {
    tasks: []
  };

  return (
    <div className="App">
      <StateProvider initialState={initialState} reducer={reducer}>
        <MainComponent />
      </StateProvider>
    </div>
  );
}

export default App;
