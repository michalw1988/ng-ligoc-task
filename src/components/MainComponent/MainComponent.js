import React, { useState } from 'react';
import './MainComponent.scss';
import { useStateValue } from '../../state/state';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


function MainComponent() {
  const [{ tasks }] = useStateValue();
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  return (
    <div className="main-component">
      <header>
        <h1>Simple Task Manager</h1>
      </header>
      <section className="tasks-list">
        <div className="containter">
          {
            tasks.map((task, index) => {
              return (
                <div className="task" key={index}>
                  <div className="title-line">
                    <h3>{task.title}</h3>
                    <div>
                      <span><FontAwesomeIcon icon={faEdit} /></span>
                      <span><FontAwesomeIcon icon={faTrash} /></span>
                    </div>
                  </div>
                  <div>{task.description}</div>
                </div>
              )
            })
          }
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