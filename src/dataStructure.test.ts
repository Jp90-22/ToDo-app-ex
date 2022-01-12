import {
  generateId,
  addTask,
  clearTaskList,
  completeAllTask,
  editTask,
  getAllTask,
  getTask,
  removeItem,
} from "./dataStructure";

describe("Working with functions to handle local storage", () => {
  test("Should generate unique ids", () => {
    const id1 = generateId();
    const id2 = generateId();
    console.log([id1, id2]);

    expect(id1).not.toEqual(id2);
  });

  test("Should add a new task to local storage", () => {
    const taskId = generateId();
    addTask({ id: taskId, todo: "Something todo", completed: false });

    expect(localStorage[taskId]).not.toBeUndefined();
  });

  test("Should edit a task in local storage", () => {
    const taskId = generateId();
    const task = { id: taskId, todo: "Something todo", completed: false };
    addTask(task);
    task.completed = true;
    editTask(task);

    expect(localStorage[taskId]).not.toEqual(task);
  });

  test("Should returns a task from local storage", () => {
    const taskId = generateId();
    addTask({ id: taskId, todo: "Something todo", completed: false });
    const addedTask = getTask(taskId);
    console.log(addedTask);
    expect(addedTask).not.toBeUndefined();
  });

  test("Should remove an item in local storage", () => {
    const taskId = generateId();
    addTask({ id: taskId, todo: "Something todo", completed: false });
    removeItem(taskId);
    expect(localStorage[taskId]).toBeUndefined();
  });

  test("Should set all task completed", () => {
    addTask({ id: generateId(), todo: "Something todo", completed: false });
    addTask({ id: generateId(), todo: "Something todo", completed: false });
    addTask({ id: generateId(), todo: "Something todo", completed: false });
    completeAllTask();

    let isAllTaskCompleted = true;

    Object.values(localStorage).forEach((value) => {
      if (!(value && JSON.parse(value).completed)) {
        isAllTaskCompleted = false;
      }
    });

    expect(isAllTaskCompleted).toBeTruthy();
  });

  test("Should returns all tasks in local storage", () => {
    addTask({ id: generateId(), todo: "Something todo", completed: false });
    addTask({ id: generateId(), todo: "Something todo", completed: false });
    addTask({ id: generateId(), todo: "Something todo", completed: false });
    const allTask = getAllTask();

    console.log(allTask);
    expect(allTask).not.toBe([]);
  });

  test("Should clear local storage", () => {
    addTask({ id: generateId(), todo: "Something todo", completed: false });
    addTask({ id: generateId(), todo: "Something todo", completed: false });
    addTask({ id: generateId(), todo: "Something todo", completed: false });

    clearTaskList();

    expect(localStorage.length).toBe(0);
  });
});
