import React from "react";
import { BrowserRouter, Outlet, Link, Routes, Route } from "react-router-dom";
import { useAppSelector } from "../app/typedReduxHooks";

const TaskContainerFooter = () => {
  // Selector to get number of tasks left
  const tasksLeft = useAppSelector(
    (state) => state.value.filter((task) => !task.completed).length
  );

  return (
    <BrowserRouter>
      <div className="fitlerTask_Container">
        <p className="itemsLeft">{tasksLeft} items left</p>

        <div className="fitlerOptions">
            <Link className="Option" to="/all">All</Link>
            <Link className="Option" to="/active">Active</Link>
            <Link className="Option" to="/completed">Completed</Link>
        </div>

        {/* When you click this botton, it should display the Alert modal to confirm the deletion of all tasks  */}
        <button className="deleteAllBtn">Delete All</button>

        {/* TODO: Add a margin bottom to see this effect */}
        <div className="effectMultiWindows-1"></div>
        <div className="effectMultiWindows-2"></div>
        <div className="effectMultiWindows-3"></div>
      </div>
    </BrowserRouter>
  );
};

export default TaskContainerFooter;
