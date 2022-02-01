import React, { useState, useEffect } from "react";
// Utilities
import {
  updateTaskThunk,
  removeTaskThunk,
  selectTaskById,
  selectTasks,
} from "../app/taskSlice";
import { useAppDispatch, useAppSelector } from "../app/typedReduxHooks";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faUnCheckCircle } from "@fortawesome/free-regular-svg-icons";

let TaskInput = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => selectTaskById(state, taskId));

  const [taskTodo, setTaskTodo] = useState("");

  const updateHandler = (e) => {
    dispatch(
      updateTaskThunk({
        id: task.id,
        todo: e.target.value.trim(),
        completed: task.completed,
      })
    );
  };

  useEffect(() => {
    setTaskTodo(task.todo);
  }, [task.todo]);

  // Event handlers
  const onTaskTodoChange = (e) => setTaskTodo(e.target.value);

  const onTaskTodoEnterPressed = (e) => {
    const keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === 13) {
      if (e.target.value) {
        updateHandler(e);
      } else {
        dispatch(removeTaskThunk(task.id));
      }

      e.target.blur();
    }
  };

  const onTaskTodoBlur = (e) => {
    if (e.target.value) {
      updateHandler(e);
    } else {
      dispatch(removeTaskThunk(task.id));
    }
  };

  const onCompleIconClick = (e) => {
    dispatch(
      updateTaskThunk({
        id: task.id,
        todo: taskTodo.trim(),
        completed: !task.completed,
      })
    );
  };

  const onTrashIconClick = () => {
    dispatch(removeTaskThunk(task.id));
  };

  return (
    <div className="taskList_content">
      <FontAwesomeIcon
        className="taskDoneIcon"
        onClick={onCompleIconClick}
        icon={task.completed ? faCheckCircle : faUnCheckCircle}
      />
      {/* TODO: Add an effect to see a border when it's focused */}
      <input
        className="task"
        type="text"
        value={taskTodo}
        onChange={onTaskTodoChange}
        onKeyPress={onTaskTodoEnterPressed}
        onBlur={onTaskTodoBlur}
      />
      {/* TODO: Wrap this into a "button" tag to improve the UX */}
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
  const tasks = useAppSelector((state) => selectTasks(state));

  return (
    <>
      {tasks.map((task, idx) => (
        <TaskInput key={idx} taskId={task.id} />
      ))}
    </>
  );
};

export default TaskList;
