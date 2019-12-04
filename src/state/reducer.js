export const reducer = (state, action) => {

  switch (action.type) {
    case 'addTask':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.newTask,
            id: state.tasks.length ? Math.max(...state.tasks.map(item => item.id)) + 1 : 0
          }
        ]
      }
      
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

    case 'editTask':
      return {
        ...state,
        tasks: state.tasks.map(task => {
          return task.id === action.editedTask.id 
            ? {
              ...task,
              title: action.editedTask.title,
              description: action.editedTask.description,
              textColor: action.editedTask.textColor,
              backgroundColor: action.editedTask.backgroundColor,
            }
            : task
        })
      }

    default:
      return state
  }
}