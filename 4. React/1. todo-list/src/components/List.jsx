import { useState } from 'react';

function TodoList(){
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(inputValue.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false // Starts as incomplete
    }

    setTasks([...tasks, newTask]);
    setInputValue('');
  }

  const handleDelete = (idToDelete) => {
    const updatedTasks = tasks.filter((task) => task.id !== idToDelete);
    setTasks(updatedTasks);
  }

  // FIXED: Toggling the complete status immutably
  const handleToggleComplete = (idToToggle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === idToToggle) {
        // Return a NEW object, copying the old task data, but flipping 'completed'
        return { ...task, completed: !task.completed };
      }
      // If it's not the clicked task, return it exactly as is
      return task;
    });

    setTasks(updatedTasks);
  }

  return(
    <div className="container">
        <h2>My Tasks</h2>

        <form className="todo-form" onSubmit={handleSubmit}>
            <input 
              type="text"
              placeholder="Enter new Task"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button type='submit' className='form-button'>Add Tasks</button>
        </form>

        {/* ACTIVE TASKS LIST */}
        <ul className='todo-list-container'>
          {tasks
            .filter(task => task.completed === false) // Only show incomplete tasks
            .map((task) => (
                <li key={task.id} className='todo-item-list'>
                  <input 
                    type='checkbox' 
                    className='check-box'
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                  />
                  <span className='todo-text'>{task.text}</span>
                  <button 
                      type='button' 
                      className='todo-item-button'
                      onClick={() => handleDelete(task.id)}>Delete
                  </button>
                </li>
            ))
          }
        </ul>

        <hr className='line'></hr>

        {/* COMPLETED TASKS LIST */}
        <ul className='completed-list'>
          <h4>Completed</h4>
          {tasks
            .filter(task => task.completed === true) // Only show completed tasks
            .map((task) => ( // FIXED: Using parentheses for implicit return!
              <li key={task.id} className='completed-task'>
                <span>{task.text}</span>
                {/* Bonus: Adding an un-check option! */}
                <input 
                    type='checkbox' 
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                  />
              </li>
            ))
          }
        </ul>
    </div>
  )
}

export default TodoList;