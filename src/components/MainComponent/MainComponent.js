import React, { useState } from 'react';
import './MainComponent.scss';
import { useStateValue } from '../../state/state';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';


function MainComponent() {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [{ tasks }, dispatch] = useStateValue();

  const handleRLDDChange = (reorderedItems) => {
    console.log(reorderedItems)
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
            itemRenderer={task => {
              return (
                <div className="task" style={{background: task.backgroundColor, color: task.textColor}}>
                  <div className="title-line">
                    <h3>{task.title}</h3>
                    <div>
                      <span><FontAwesomeIcon icon={faEdit} /></span>
                      <span><FontAwesomeIcon icon={faTrash} onClick={() => dispatch({type: 'removeTask', idToRemove: task.id})} /></span>
                    </div>
                  </div>
                  <div>{task.description}</div>
                </div>
              );
            }}
            onChange={handleRLDDChange}
          />
        </div>
      </section>

      <section className="add-task-button">
        <button onClick={() => setAddTaskModalOpen(true)}>Add new task</button>
      </section>
      <footer>
        <p>Created by Michał Wiśniewski (MW Projects), December 2019</p>
      </footer>

      { addTaskModalOpen && <AddTaskModal closeModalHandler={() => setAddTaskModalOpen(false)}/> }
    </div>
  );
}

export default MainComponent;