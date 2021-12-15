import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const Task = () => {
    const [task, setTask] = useState({id:"", name:"", task:"", due_date:"", category:"", completed:""});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const url = `/api/v1/show/${id}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network error.");
            })
            .then(response => setTask(response))
            .catch(() => navigate("/tasks"));
    }, [])

    const addHtmlEntities = (str) => {
        return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }

    const deleteTask = (e) => {
        const url = `/api/v1/destroy/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
    
        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                return response.json();
                }
                throw new Error("Network error.");
            })
            .then(() => navigate("/tasks"))
            .catch(error => console.log(error.message));
    }

    const editTask = () => {
        const editpath = `/task/${id}/edit`;
        navigate(editpath);
    }

    return (
        <div className="">
            <div className="position-relative d-flex align-items-center justify-content-center">
                <h1 className="display-4 position-relative">
                    {addHtmlEntities(task.name)}
                </h1>
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        <ul className="list-group">
                            <h5 className="mb-2">Due Date (24 Hrs)</h5>
                            {moment(task.due_date).utc().format('DD-MMM-YYYY HH:mm')}
                            <h5></h5>
                            <h5 className="mb-2">Category</h5>
                            {task.category === "" ? "None" : addHtmlEntities(task.category)}
                            <h5></h5>
                            <h5 className="mb-2">Completion Status</h5>
                            {task.completed ? "Completed" : "Not Completed"}
                            <h5></h5>
                        </ul>
                    </div>
                <div className="col-sm-12 col-lg-7">
                    <h5 className="mb-2">Description</h5>
                        <div
                            dangerouslySetInnerHTML={{
                            __html: `${addHtmlEntities(task.task)}`}}
                        />
                </div>
            <div className="col-sm-12 col-lg-2">
                <button type="button" className="btn btn-danger" onClick={editTask}>
                    Edit Task
                </button>
                <h1></h1>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => { if (window.confirm('Do you wish to delete this task?')) deleteTask(e) } }>
                    Delete Task
                </button>
            </div>
            </div>
                <Link to="/tasks" className="btn btn-link">
                    Back to Tasks
                </Link>
            </div>
      </div>
    );
}

export default Task;