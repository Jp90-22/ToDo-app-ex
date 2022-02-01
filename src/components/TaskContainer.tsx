import React from "react";
import AddTaskInput from "./AddTaskInput";
import TaskList from "./TaskList";
import TaskContainerFooter from "./TaskContainerFooter";
import DeleteModalAlert from "./DeleteModalAlert";

// Styles
import "./normalize.css";
import "./TaskContainer.scss";

export default function TaskContainer() {
  return (
    <div>
      <h1 className="nameApp">TO-DO LIST</h1>

      <div className="taskContent">
        <DeleteModalAlert />
        
        <AddTaskInput />

        <TaskList />

        <TaskContainerFooter />
      </div>
    </div>
  );
}
