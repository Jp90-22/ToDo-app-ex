export default interface Task {
  id: string;
  todo: string;
  completed: boolean;
}

export const generateId = (): string =>
  Math.random().toString(36).substring(2, 18);

export function addTask(newTask: Task) {
  localStorage.setItem(newTask.id, JSON.stringify(newTask));
}

export function editTask(taskEdited: Task) {
  localStorage[taskEdited.id] = JSON.stringify(taskEdited);
}

export function getTask(key: string): Task {
  return JSON.parse(localStorage.getItem(key)) as Task;
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}

export function completeAllTask() {
  Object.keys(localStorage).forEach((key) => {
    localStorage[key] = localStorage[key].replace("false", "true");
  });
}

export function getAllTask(): Task[] {
  return Object.values(localStorage).map((value) => JSON.parse(value) as Task);
}

export function clearTaskList() {
  localStorage.clear();
}
