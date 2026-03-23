import React, { useState } from 'react';
import './App.css';

function TodoList() {
  //Step1: Create a state to handle todo. And a state to handle user input.
  //Step2: Make an input element for user. On the input element attach a listener to capture user changes.
  //Step3: Add a delete button to the list. Create a function to update todo state when delete is clicked.
  //Step4: Add a function to update the status of todo items.

  const [todoTask, setTodoTask] = useState([]);
  const [userInput, setUserInput] = useState('');

  //UserInput capture.
  const handleInput = (event) => {
    setUserInput(() => (event.target.value));
  }

  //Add todo item on submit.
  const handleSubmit = (event) => {
    event.preventDefault();
    const todoItem = {
      id: Date.now(),
      text: userInput,
      completed: false,
    }

    setTodoTask((prev) => ([...prev, todoItem]));
    setUserInput(() => (''));
  }

  //function to handle Delete.
  const handleDelete = (taskId) => {
    console.log(taskId);
    const updatedTodo = todoTask.filter((task) => (
      task.id != taskId
    ));

    setTodoTask(() => ([...updatedTodo]))
  }

  //function to update toDo Task:
  const handleUpdate = (taskId) => {
    const updatedTodo = todoTask.map((task) => {
      if (task.id == taskId) {
        return { ...task, completed: !task.completed }
      }

      return task
    })

    setTodoTask(updatedTodo);
  }

  return (
    <div className="container">
      <form className='form-container' onSubmit={handleSubmit}>
        <h1>Todo List</h1>
        <input
          type="text"
          placeholder="Enter todo"
          value={userInput}
          onChange={handleInput}
        ></input>
        <button type='submit'>Add</button>
      </form>
      <div className='todo-list-container'>
        <ul>
          {todoTask.map((task) => (
            <li className='todo-container' key={task.id}>
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => handleUpdate(task.id)}
              />

              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>

              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;