import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodosState {
  tasks: Todo[];
}

const initialState: TodosState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    addTodo(state, action: PayloadAction<{ text: string }>) {
      console.log('Current state:', state);
      state.tasks.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false,
      });
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTodoComplete(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;
export default todoSlice.reducer;
