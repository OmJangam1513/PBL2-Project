import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/AuthContext';
import '../styles/Task.css';

const Tasks = ({ goBack }) => {
  const { tasks, setTasks } = useTasks();
  const [newTask, setNewTask] = useState('');
  const { user } = useAuth();

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="tasks-container">
      <button className="back-button" onClick={goBack}>Back</button>
      <h1>Tasks</h1>
      {user.role !== 'employee' && (
        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            <button onClick={() => handleToggleComplete(index)} className="mark-complete-btn">
              {task.completed ? '✔' : '✖'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;