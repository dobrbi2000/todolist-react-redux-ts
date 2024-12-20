import React, { ChangeEvent, useState } from 'react';
import todoIcon from '../images/icon.png';
import { addTodo, removeTodo, toggleTodoComplete } from '../store/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/';

function TodoApp() {
  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos.tasks);

  console.log('Todos:', todos);
  const [inputText, setInputText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddTask = () => {
    if (inputText.trim() === '') {
      setError('Please enter some text to add a task');
      return;
    }
    dispatch(
      addTodo({
        text: inputText,
      })
    );
    setInputText('');
    setError('');
  };

  const handleDeleteTask = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTask = (id: string) => {
    dispatch(toggleTodoComplete(id));
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
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInputText(event.target.value)}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && handleAddTask()}
          />
          <button id="add-task-btn" onClick={handleAddTask}>
            Add
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <ul id="list-todo-app-container">
          {todos.map((task) => (
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
