import React from "react";
import AddTaskInput from "./AddTaskInput";
import TaskList from "./TaskList";
import TaskContainerFooter from "./TaskContainerFooter";
// Styles
import "./normalize.css";
import "./TaskContainer.scss";

export default function TaskContainer() {
  return (
    <div>
      <h1 className="nameApp">TO-DO LIST</h1>

      <div className="taskContent">
        <AddTaskInput />

        <TaskList />

        <TaskContainerFooter />
      </div>
    </div>
  );
}
