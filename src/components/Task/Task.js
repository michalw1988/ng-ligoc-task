import React, { useState } from 'react';
import './Task.scss';
import { useStateValue } from '../../state/state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'


function Task({ task }) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const [, dispatch] = useStateValue()

  return (
    <div className="task" style={{background: task.backgroundColor, color: task.textColor}}>
      <div className="title-line">
        <h3> 
          {task.title}
          {task.description && !isDescriptionOpen && <FontAwesomeIcon className="chevron" icon={faChevronDown} onClick={() => setIsDescriptionOpen(true)} />}
          {task.description && isDescriptionOpen && <FontAwesomeIcon className="chevron" icon={faChevronUp} onClick={() => setIsDescriptionOpen(false)} />}
        </h3>
        <div>
          <span><FontAwesomeIcon icon={faEdit} /></span>
          <span><FontAwesomeIcon icon={faTrash} onClick={() => dispatch({type: 'removeTask', idToRemove: task.id})} /></span>
        </div>
      </div>
      { isDescriptionOpen && <div>{task.description}</div> }
    </div>
  );
}

export default Task;