import React, { useState } from 'react'
import './Modals.scss'
import { useStateValue } from '../../state/state'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { CompactPicker } from 'react-color'

function EditTaskModal({ closeModalHandler, task }) {
  const [title, setTitle] = useState(task.title || '')
  const [titleError, setTitleError] = useState(false)
  const [description, setDescription] = useState(task.description || '')
  const [backgroundColor, setBackgroundColor] = useState(task.backgroundColor || '#ccc')
  const [textColor, setTextColor] = useState(task.textColor || '#000')
  const [displayBackgroundColorPicker, setDisplayBackgroundColorPicker] = useState(false)
  const [displayTextColorPicker, setDisplayTextColorPicker] = useState(false)
  const [, dispatch] = useStateValue()

  const handleEditTask = () => {
    const newTitleError = !title.length
    if (!newTitleError) {
      const editedTask = {
        ...task,
        title,
        description,
        backgroundColor,
        textColor
      }
      dispatch({
        type: 'editTask',
        editedTask,
      })
      closeModalHandler()
    }
    setTitleError(newTitleError)
  }

  return (
    <div className="modal">
      <div className="modal-box">

        <div className="close-icon" onClick={closeModalHandler}><FontAwesomeIcon icon={faTimes} /></div>

        <h2>Edit task</h2>

        <div className="input-line">
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          { titleError && <div className="validation-message">Please provide task title</div>}
        </div>
        
        <div className="input-line">
          {/* <label>Description</label> */}
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="color-input-line">
          <span>Background color</span>
          <span className="picker-button" onClick={ () => setDisplayBackgroundColorPicker(!displayBackgroundColorPicker) } style={{ background: backgroundColor }}></span>
        </div>
        { 
          displayBackgroundColorPicker && <div className="color-picker-popover">
            <div onClick={ () => setDisplayBackgroundColorPicker(false) }/>
            <CompactPicker 
              color={backgroundColor}
              onChangeComplete={ color => setBackgroundColor(color.hex) }
            />
          </div>
        }

        <div className="color-input-line">
          <span>Text color</span>
          <span className="picker-button" onClick={ () => setDisplayTextColorPicker(!displayTextColorPicker) } style={{ background: textColor }}></span>
        </div>
        { 
          displayTextColorPicker && <div className="color-picker-popover">
            <div onClick={ () => setDisplayTextColorPicker(false) }/>
            <CompactPicker 
              color={backgroundColor}
              onChangeComplete={ color => setTextColor(color.hex) }
            />
          </div>
        }

        <div className="button-wrapper">
          <button id="confirm-button" onClick={handleEditTask}>Confirm changes</button>
        </div>
      </div>
    </div>
  )
}

export default EditTaskModal