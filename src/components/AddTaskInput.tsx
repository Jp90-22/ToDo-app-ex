import React, { useState } from "react";
// Utilities
import { generateId } from "../dataStructure";
import { addTaskThunk, setAllTaskCompletedThunk } from "../app/taskSlice";
import { useAppDispatch } from "../app/typedReduxHooks";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AddTaskInput = () => {
  const dispatch = useAppDispatch();
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
    <div className="addTaskInput_content">
      {/* TODO: Add a hover effect to this icon and wrap it in a "button" tag */}
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
  );
};

export default AddTaskInput;
