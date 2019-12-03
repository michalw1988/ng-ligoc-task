import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent/MainComponent';
import { StateProvider } from './state/state';


function App() {
  const initialState = {
    // tasks: [
    //   {
    //     title: 'title 1',
    //     description: 'desc',
    //     textColor: 'red',
    //     backgroundColor: 'blue',
    //     id: 0,
    //     done: false,
    //   },
    //   {
    //     title: 'title 2',
    //     description: 'desc',
    //     textColor: 'red',
    //     backgroundColor: 'blue',
    //     id: 5,
    //     done: false,
    //   },
    //   {
    //     title: 'title 3',
    //     description: 'desc',
    //     textColor: 'red',
    //     backgroundColor: 'blue',
    //     id: 7,
    //     done: false,
    //   },
    // ],
    tasks: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addTask':
        const newTaskId = state.tasks.length ? Math.max(...state.tasks.map(item => item.id)) + 1 : 0
        return {
          ...state,
          tasks: [
            ...state.tasks,
            {
              ...action.newTask,
              id: newTaskId
            }
          ]
        };
      case 'reorderTasks':
        return {
          ...state,
          tasks: action.reorderedTasks,
        }
      case 'removeTask':
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.idToRemove)
        }
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
