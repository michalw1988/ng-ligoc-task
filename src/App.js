import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent/MainComponent';
import { StateProvider } from './state/state';


function App() {
  const initialState = {
    tasks: [
      {
        title: 'title 1',
        description: 'desc',
        textColor: 'red',
        backgroundColor: 'blue',
        order: 0,
        done: false,
      },
      {
        title: 'title 2',
        description: 'desc',
        textColor: 'red',
        backgroundColor: 'blue',
        order: 1,
        done: false,
      },
      {
        title: 'title 3',
        description: 'desc',
        textColor: 'red',
        backgroundColor: 'blue',
        order: 2,
        done: false,
      },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addTask':
        console.log('yo!', action)
        return {
          ...state,
          tasks: [
            ...state.tasks,
            action.newTask
          ]
        };
      default:
        return state;
    }
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
