import React from 'react';
import './MainComponent.scss';

const tasks = [
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
]

function MainComponent() {
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
                <div className="task" kay={index}>
                  <div>{task.title}</div>
                  <div>{task.description}</div>
                </div>
              )
            })
          }
        </div>
      </section>
      <section className="add-task-button">
        <button>Add new task</button>
      </section>
      <footer>
        <p>Created by Michał Wiśniewski (MW Projects), December 2019</p>
      </footer>
    </div>
  );
}

export default MainComponent;