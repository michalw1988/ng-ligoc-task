import React, { useState } from 'react';
import './MainComponent.scss';
import { useStateValue } from '../../state/state';
import AddTaskModal from '../Modals/AddTaskModal';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import Task from '../Task/Task';
import EditTaskModal from '../Modals/EditTaskModal';

function MainComponent() {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [{ tasks }, dispatch] = useStateValue();

  const handleRLDDChange = reorderedItems => {
    dispatch({
      type: 'reorderTasks',
      reorderedTasks: reorderedItems,
    });
  }

  return (
    <div className="main-component">
      <header>
        <h1>Simple Task Manager</h1>
      </header>

      <section className="tasks-list">
        <div className="containter">
          { !tasks.length && <div className="info-message">No tasks on the list. Use the buttom below to add some.</div> }
          { tasks.length >= 1 && <div className="info-message">You can reorder your tasks by draggineg them up or down.</div> }
          <RLDD
            items={tasks}
            itemRenderer={task => <Task task={task} editHandler={() => setTaskToEdit(task)} />}
            onChange={handleRLDDChange}
          />
        </div>
      </section>

      <section className="actions">
        <button onClick={() => setAddTaskModalOpen(true)}>Add new task</button>
        <button onClick={() => console.log(tasks)}>Export tasks</button>
      </section>

      <footer>
        <p>Created by Michał Wiśniewski (MW Projects), December 2019</p>
      </footer>

      { addTaskModalOpen && <AddTaskModal closeModalHandler={() => setAddTaskModalOpen(false)}/> }
      { taskToEdit && <EditTaskModal task={taskToEdit} closeModalHandler={() => setTaskToEdit(null)} />}
    </div>
  );
}

export default MainComponent;