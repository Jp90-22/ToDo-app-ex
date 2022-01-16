import store from "./store";
import {
  updateTaskList,
  addTaskThunk,
  updateTaskThunk,
  removeTaskThunk,
  clearTaskListThunk,
  setAllTaskCompletedThunk,
} from "./taskSlice";
import { generateId, addTask } from "../dataStructure";

describe("Working with task slice functions and store state", () => {
  // Seed data
  addTask({ id: generateId(), todo: "Something to do", completed: false });
  addTask({ id: generateId(), todo: "Something to do", completed: false });
  addTask({ id: generateId(), todo: "Something to do", completed: false });

  test("Should return all task in store state", () => {
    store.dispatch(updateTaskList());
    const state = store.getState();

    console.log(state);
    expect(state.value).not.toBe([]);
  });

  test("Should add new task to store state", () => {
    const generatedId = generateId();
    store.dispatch(
      addTaskThunk({
        id: generatedId,
        todo: "Something to do",
        completed: false,
      })
    );
    const addedTask = store
      .getState()
      .value.find((task) => task.id === generatedId);

    expect(addedTask).not.toBeUndefined();
  });

  test("should should edit a task in store state", () => {
    const generatedId = generateId();
    const taskToAdd = {
      id: generatedId,
      todo: "Something to do",
      completed: false,
    };
    addTask(taskToAdd);

    store.dispatch(
      updateTaskThunk({
        id: generatedId,
        todo: "Something edited",
        completed: true,
      })
    );
    const editedTask = store
      .getState()
      .value.find((task) => task.id === generatedId);

    expect(editedTask).not.toEqual(taskToAdd);
  });

  test("should remove a task from store state", () => {
    const generatedId = generateId();
    addTask({
      id: generatedId,
      todo: "Something to do",
      completed: false,
    });

    store.dispatch(removeTaskThunk(generatedId));
    const removedTask = store
      .getState()
      .value.find((task) => task.id === generatedId);

    expect(removedTask).toBeUndefined();
  });

  test("should set all task completed in store state", () => {
    store.dispatch(setAllTaskCompletedThunk());
    const tasks = store.getState().value;
    let isAllTaskCompleted = true;

    tasks.forEach((task) => {
      if (!task.completed) {
        isAllTaskCompleted = false;
      }
    });

    expect(isAllTaskCompleted).toBeTruthy();
  });

  test("should clear store state", () => {
    store.dispatch(clearTaskListThunk());
    const state = store.getState();

    console.log(state);
    expect(state.value).toEqual([]);
  });
});
