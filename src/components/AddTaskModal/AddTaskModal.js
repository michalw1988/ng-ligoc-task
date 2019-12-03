import React, { useState } from 'react';
import './AddTaskModal.scss';
import { useStateValue } from '../../state/state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


function AddTaskModal({ closeModalHandler }) {
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [description, setDescription] = useState('')
  const [, dispatch] = useStateValue();

  const handleAddTask = () => {
    const newTitleError = !title.length

    if (!newTitleError) {
      console.log('add !', title, description)
      dispatch({
        type: 'addTask',
        newTask: {
          title,
          description,
        }
      });
      closeModalHandler()
    }
    setTitleError(newTitleError)
  }

  return (
    <div className="add-task-modal">
      <div className="modal-box">

        <div className="close-icon" onClick={closeModalHandler}><FontAwesomeIcon icon={faTimes} /></div>

        <h2>Add new task</h2>

        <div className="input-line">
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          { titleError && <div className="validation-message">Please provide task title</div>}
        </div>
        
        <div className="input-line">
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="button-wrapper">
          <button onClick={handleAddTask}>Add task</button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;