import { useState } from 'react';

function TodoList(){
  //Task 1: Take user input display it inside a list.
  //Step 1: Create a state to handle user input string.
  //Step 2: Create a state to store all user string as an objects within an arrays.
  //Step 3: Traverse the new array created and display list elements.

  //Task 2: Only display elements whose status of completion is false.
  //Step 1: Filter through the task and only select whose completion is false.
  //Step 2: Then map thorugh the filtered items and display them.

  //Task 3: When a checkbox is clicked, update the completion to True.
  //Step 1: Attach event listner on each check-box.

  const [userInput, setUserInput] = useState('');
  const [tasks, setTask] = useState([]);

  const handleSubmit = (event) =>{
    console.log("Running handle Submit");
    event.preventDefault();
    if(userInput.trim() === ""){
      console.log("No User Input");
      return
    }

    const newTask = {
      id: Date.now(),
      text: userInput,
      completed: false
    }

    setTask([...tasks, newTask]);
    
    setUserInput("");
  }

  const toggleCompletion = (taskId) =>{
    console.log("OnClick toggle triggered");
    if(taskId){
      const updatedTask = tasks.map((task) => {
        if(task.id == taskId){
          return {
            id: task.id,
            text: task.text,
            completed: true
          }
        }
        return task
      })
      console.log("Updated Task List:", updatedTask);
      setTask(updatedTask);
    }
  }
  
  return(
    <div className="container">
        <h2>MY TASKS</h2>

        <form className='todo-form' onSubmit={(event)=> handleSubmit(event)}>
          <input
            type='text'
            placeholder='Enter a Task'
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />

          <button className='form-button' type='submit'> ADD TASK </button>
        </form>

        <ul className = 'todo-list-container'>
          {
            tasks.filter((task)=> task.completed === false).map((task) => (
              <li key={task.id} className='todo-item-list'>
                <input type='checkbox' onClick={() => toggleCompletion(task.id)}/>
                <span>{task.text}</span>
              </li>
            ))
          }
        </ul>

        <hr className='line'/>

        <ul className = 'todo-list-container'>
          <h3>Completed</h3>
          {
            tasks.filter((task) => (task.completed === true)).map((task)=>(
              <li key={task.id} className='todo-item-list'>
                <span>{task.text}</span>
                <button className='todo-item-button'>Delete</button>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

export default TodoList;