import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../utils/api";

export const fetchTaskWeather = createAsyncThunk(
  "tasks/fetchWeather",
  async (location, { rejectWithValue }) => {
    try {
      const response = await fetchWeather(location);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.items.push({
        ...action.payload,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      });
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    toggleComplete: (state, action) => {
      const task = state.items.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskWeather.fulfilled, (state, action) => {
        const task = state.items.find(
          (task) => task.id === action.meta.arg.taskId
        );
        if (task) task.weather = action.payload;
      })
      .addCase(fetchTaskWeather.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addTask, deleteTask, updateTask, toggleComplete } = tasksSlice.actions;
export default tasksSlice.reducer;
