import React from "react"
import TaskContainerFooter from "./TaskContainerFooter";
import "./DeleteModalAlert.scss"

// COMPONENT: the Alert modal to confirm the deletion of all tasks

function DeleteModalAlert(){

    return(
        <div className={"deleteModalAlertContent "}>
            <h2 className="areYouSureText">Are you sure?</h2>
            
            <div className="deleteDiscardBtn">
                <button className="deleteBtn">Yes, delete all</button>
                <button className="discardBtn">Discard</button>
            </div>
        </div>
    )
};

export default DeleteModalAlert;