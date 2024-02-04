import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import todo from '../screens/to-do-list.png'
import "./TodoList.css"; 

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        content: taskInput.trim(),
        completed: false,
        deleted:false,
        creationDate: new Date().toLocaleString() // Include creation date
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
    else{
      alert(
        "Empty!!"
      )
    }
  };

  const handleTask = (index) => {
    

    const updatedTasks = tasks.map((task, i) => {
        if (i === index) {
          const updatedTask = { ...task,delete:true};
            return null; // Mark the task for removal
        }
        return task;
    }).filter(task => task !== null); // Filter out null tasks

    setTasks(updatedTasks);
};

  const handleClearTasks = () => {
    setTasks([]);
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        const updatedTask = { ...task, completed: !task.completed ,creationDate:new Date().toLocaleString()};
        if (updatedTask.completed) {
          setCompletedTasks([...completedTasks, updatedTask]);
          return null; // Mark the task for removal
        }
        return updatedTask;
      }
      return task;
    }).filter(task => task !== null); // Filter out null tasks
    setTasks(updatedTasks);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className='container'>
      <h1>To-Do List <img style={{height:"50px"}} src={todo}/></h1>
      <div className='content'>
        <div className='display' style={{background:"linear-gradient(to left, #ff6e7f, #bfe9ff)"}}>
        <h3>Scheduled Tasks</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span className={task.completed ? 'completed' : ''}>{task.content}</span>
                <span className="creation-date">{task.creationDate}</span>
                <button className='but' onClick={() => handleTask(index)}><DeleteIcon/></button>
              </li>
            ))}
          </ul>
        </div>
        <div className='display' style={{background:"linear-gradient(to left, #ff6e7f, #bfe9ff)"}}>
          <h3>Completed Tasks</h3>
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>
                <span className='completed'>{task.content}</span>
                <span className="creation-date">{task.creationDate}</span>
              </li>
            ))}
          </ul>
        </div>
        <input 
          type='text' 
          placeholder='Enter Your Task' 
          className="form-control mb-2" 
          required
          value={taskInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className='button-group d-flex justify-content-between'>
          <button type="button" className="btn btn-outline-success" onClick={handleAddTask}>Add</button>
          <button type="button" className="btn btn-outline-warning" onClick={handleClearTasks}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
