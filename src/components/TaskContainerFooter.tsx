import React from "react";
import { useAppSelector } from "../app/typedReduxHooks";

const TaskContainerFooter = () => {
  // Selector to get number of tasks left
  const tasksLeft = useAppSelector(
    (state) => state.value.filter((task) => !task.completed).length
  );

  return (
    <div className="fitlerTask_Container">
      <p className="itemsLeft">{tasksLeft} items left</p>

      {/* TODO: Change "p" tag to "Link" tag from react-router */}
      <div className="fitlerOptions">
        <p>All</p>
        <p>Active</p>
        <p>Completed</p>
      </div>

      {/* TODO: Add a new button here to clear all the list */}

      {/* TODO: Add a margin bottom to see this effect */}
      <div className="effectMultiWindows-1"></div>
      <div className="effectMultiWindows-2"></div>
      <div className="effectMultiWindows-3"></div>
    </div>
  );
};

export default TaskContainerFooter;
