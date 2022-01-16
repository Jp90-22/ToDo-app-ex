import { createSelector, createSlice } from "@reduxjs/toolkit";
import Task, {
  getAllTask,
  addTask,
  editTask,
  completeAllTask,
  removeTask,
  clearTaskList,
} from "../dataStructure";

export interface TaskState {
  value: Task[];
}

const initialState: TaskState = {
  value: getAllTask(),
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTaskList(state) {
      state.value = getAllTask();
    },
  },
});

// Thunks
const dispatchUpdateTaskListThunk = (dispatch) => {
  dispatch(updateTaskList());
};

export const addTaskThunk = (task: Task) => {
  addTask(task);
  return dispatchUpdateTaskListThunk;
};

export const updateTaskThunk = (task: Task) => {
  editTask(task);
  return dispatchUpdateTaskListThunk;
};

export const removeTaskThunk = (id: string) => {
  removeTask(id);
  return dispatchUpdateTaskListThunk;
};

export const setAllTaskCompletedThunk = () => {
  completeAllTask();
  return dispatchUpdateTaskListThunk;
};

export const clearTaskListThunk = () => {
  clearTaskList();
  return dispatchUpdateTaskListThunk;
};

export const selectAllTask = (state): Task[] => state.value;

export const selectTaskById = (state, taskId): Task =>
  state.value.find((task) => task.id === taskId);

export const { updateTaskList } = taskSlice.actions;

export default taskSlice.reducer;
