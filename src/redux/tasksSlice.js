import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: loadTasksFromLocalStorage(),
    currentDate: new Date().toLocaleDateString(),
  },
  reducers: {
    addTask: (state, action) => {
      const { task, priority, type, location, date } = action.payload;
      state.items.push({
        id: Date.now(),
        task,
        priority,
        type,
        location,
        date,
      });
      saveTasksToLocalStorage(state.items);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.items);
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
