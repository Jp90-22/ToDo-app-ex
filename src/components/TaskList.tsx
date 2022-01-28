import React, { useState } from "react";
// Utilities
import {
  updateTaskThunk,
  removeTaskThunk,
  selectTaskById,
  selectAllTask,
} from "../app/taskSlice";
import { useAppDispatch, useAppSelector } from "../app/typedReduxHooks";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faUnCheckCircle } from "@fortawesome/free-regular-svg-icons";

let TaskInput = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => selectTaskById(state, taskId));

  const [taskTodo, setTaskTodo] = useState(task.todo);
  const [completed, setCompleted] = useState(task.completed);

  // Event handlers
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

const TaskList = () => {
  const tasks = useAppSelector((state) => selectAllTask(state));

  return (
    <>
      {tasks.map((task, idx) => (
        <TaskInput key={idx} taskId={task.id} />
      ))}
    </>
  );
};

export default TaskList;
