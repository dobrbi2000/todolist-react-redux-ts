import React, { useState } from 'react';
import todoIcon from '../images/icon.png';
import { useEffect } from 'react';

function TodoApp() {
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  const handleAddTask = () => {
    if (inputText.trim() === '') {
      setError('Please enter some text to add a task');
    } else {
      const newTask = {
        id: new Date().toISOString(),
        text: inputText,
        completed: false,
      };
      setTodo([...todo, newTask]);
      setInputText('');
      setError('');
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTodo = todo.filter((task) => task.id !== id);
    setTodo(updatedTodo);
  };

  const handleToggleTask = (id) => {
    const toggledTask = todo.map((task) => {
      if (task.id === id) {
        console.log('Before toggle:', task);
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    console.log('After toggle:', toggledTask);
    setTodo(toggledTask);
  };

  return (
    <div className="page-todo">
      <div className="todo-app">
        <h2>
          To-Do List <img src={todoIcon} alt="Todo icon" />
        </h2>
        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="Add your text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleAddTask()}
          />
          <button id="add-task-btn" onClick={handleAddTask}>
            Add
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <ul id="list-todo-app-container">
          {todo.map((task) => (
            <li key={task.id} className={task.completed ? 'checked' : ''} onClick={() => handleToggleTask(task.id)}>
              {task.text}
              <span
                className="delete-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteTask(task.id);
                }}
              >
                {'\u00D7'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
