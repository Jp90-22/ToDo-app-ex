import React, { useState } from "react";
// Utilities
import { generateId } from "../dataStructure";
import {
  updateTaskList,
  addTaskThunk,
  updateTaskThunk,
  removeTaskThunk,
  setAllTaskCompletedThunk,
  clearTaskListThunk,
  selectTaskById,
  selectAllTask,
} from "../app/taskSlice";
import { useAppDispatch, useAppSelector } from "../app/typedReduxHooks";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCheckCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faUnCheckCircle } from "@fortawesome/free-regular-svg-icons";

// Styles
import "./normalize.css";
import "./TaskContainer.scss";

let TaskInput = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => selectTaskById(state, taskId));

  const [taskTodo, setTaskTodo] = useState(task.todo);
  const [completed, setCompleted] = useState(task.completed);

  const onTaskTodoChange = (e) => {
    setTaskTodo(e.target.value);
    dispatch(updateTaskThunk({ id: task.id, todo: taskTodo, completed }));
  };

  const onCompleIconClick = (e) => {
    setCompleted(!completed);
    dispatch(updateTaskThunk({ id: task.id, todo: taskTodo, completed }));
  };

  const onTrashIconClick = () => {
    // if (window.confirm("Are you sure you want to delete this task?")) {
    dispatch(removeTaskThunk(task.id));
    // }
  };

  return (
    <div className="taskList_content">
      <FontAwesomeIcon
        className="taskDoneIcon"
        onClick={onCompleIconClick}
        icon={completed ? faCheckCircle : faUnCheckCircle}
      />
      <input
        className="task"
        type="text"
        value={taskTodo}
        onChange={onTaskTodoChange}
      />
      <FontAwesomeIcon
        className="deleteTaskIcon"
        onClick={onTrashIconClick}
        icon={faTrashAlt}
      />
    </div>
  );
};

TaskInput = React.memo(TaskInput);

export default function TaskContainer() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => selectAllTask(state));
  const [newTaskTodo, setNewTaskTodo] = useState("");

  const onAddTaskKeyPress = (e) => {
    if (newTaskTodo) {
      const keycode = e.keyCode ? e.keyCode : e.which;
      if (keycode === 13) {
        dispatch(
          addTaskThunk({
            id: generateId(),
            todo: newTaskTodo,
            completed: false,
          })
        );
        setNewTaskTodo("");

        e.preventDefault();

        return false;
      }
    }
  };

  const onAddTaskChange = (e) => setNewTaskTodo(e.target.value);

  const onSetAllTaskCompletedClick = () => {
    dispatch(setAllTaskCompletedThunk());
  };

  return (
    <div>
      <h1 className="nameApp">TO-DO LIST</h1>

      <div className="taskContent">
        <div className="addTaskInput_content">
          <FontAwesomeIcon
            className="iconAddTask"
            icon={faChevronDown}
            onClick={onSetAllTaskCompletedClick}
          />
          <input
            className="addTaskInput"
            type="text"
            value={newTaskTodo}
            onChange={onAddTaskChange}
            onKeyPress={onAddTaskKeyPress}
            placeholder="What's news?"
          />
        </div>

        {tasks.map((task, idx) => (
          <TaskInput key={idx} taskId={task.id} />
        ))}

        <div className="fitlerTask_Container">
          <p className="itemsLeft">3 Items left</p>

          <div className="fitlerOptions">
            <p>All</p>
            <p>Active</p>
            <p>Completed</p>
          </div>

          <div className="effectMultiWindows-1"></div>
          <div className="effectMultiWindows-2"></div>
          <div className="effectMultiWindows-3"></div>
        </div>
      </div>
    </div>
  );
}
