export default interface Task {
  id: string;
  todo: string;
  completed: boolean;
}

/**
 * Generate an unique id
 * @returns a random sequence of string simulating unique id
 */
export const generateId = (): string =>
  Math.random().toString(36).substring(2, 18);

/** Add a new task to local storage */
export function addTask(newTask: Task) {
  localStorage.setItem(newTask.id, JSON.stringify(newTask));
}

/** Edit a task by its id and the given values */
export function editTask(taskEdited: Task) {
  localStorage.setItem(taskEdited.id, JSON.stringify(taskEdited));
}

/** Get a task from local storage */
export function getTask(key: string): Task {
  return JSON.parse(localStorage.getItem(key)) as Task;
}

/** Eliminate a task from local storage by its key */
export function removeTask(id: string) {
  localStorage.removeItem(id);
}

/** Set all task completed */
export function completeAllTask() {
  Object.keys(localStorage).forEach((key) => {
    localStorage[key] = localStorage[key].replace("false", "true");
  });
}

/**
 * Get all tasks in local storage
 * @returns array containing all task in local storage
 */
export function getAllTask(): Task[] {
  return Object.values(localStorage).map((value) => JSON.parse(value) as Task);
}

/** Clear local storage with all tasks */
export function clearTaskList() {
  localStorage.clear();
}
