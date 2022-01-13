import { createSlice } from "@reduxjs/toolkit";
import Task, { getAllTask } from "../dataStructure";

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

export const { updateTaskList } = taskSlice.actions;

export default taskSlice.reducer;
