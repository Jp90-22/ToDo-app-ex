import { createSlice, createSelector } from "@reduxjs/toolkit";
import Task, {
  getAllTasks,
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
  value: getAllTasks(),
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTaskList(state) {
      state.value = getAllTasks().sort(sortStateFunction);
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

/** Function to sort the state array */
function sortStateFunction(a: Task, b: Task): number {
  const p1: number = Number.parseInt(a.id.split("-")[0]);
  const p2: number = Number.parseInt(b.id.split("-")[0]);
  return p2 - p1;
}

export const selectTasks = createSelector(
  [(state): Task[] => state.value],
  (tasks) => tasks
);

export const selectTaskById = (state, taskId: string): Task =>
  state.value.find((task: Task) => task.id === taskId);

export const { updateTaskList } = taskSlice.actions;

export default taskSlice.reducer;
