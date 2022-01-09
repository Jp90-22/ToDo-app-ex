import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// Styles
import "./normalize.css";
import "./TaskContainer.scss";

const AddTaskInput = () => {
  return (
    <div className="addTaskInput_content">
      <FontAwesomeIcon className="iconAddTask" icon={faChevronDown} />
      <input className="addTaskInput" type="text" placeholder="What's news?" />
    </div>
  );
};

const TaskList = () => {
  return (
    <div className="taskList_content">
      <FontAwesomeIcon className="taskDoneIcon" icon={faCheckCircle} />
      <input className="task" type="text" value="Mucho texto..." />
      <FontAwesomeIcon className="deleteTaskIcon" icon={faTrashAlt} />
    </div>
  );
};

export default function TaskContainer() {
  return (
    <div>
      <h1 className="nameApp">TO-DO LIST</h1>

      <div className="taskContent">
        <AddTaskInput />
        <TaskList />

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
