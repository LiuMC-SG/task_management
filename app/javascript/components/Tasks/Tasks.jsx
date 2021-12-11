import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskCheckbox from "./TaskCheckbox";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const url = "/api/v1/tasks/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network failed.");
            })
            .then(response => setTasks(response))
            .catch(() => navigate("/"));
    }, [])

    return (
        <>
            <Link to="/" className="btn btn-link">
                Home
            </Link>
            <section className="jumbotron jumbotron-fluid text-center">
                <div className="container py-5">
                    <h1 className="display-4">Tasks</h1>
                </div>
            </section>
            <div className="py-5">
                <main className="container">
                    <div className="text-right mb-3">
                        <Link to="/task/new" className="btn custom-button">
                            Create New Task
                        </Link>
                    </div>
                    <div className="row">
                        {tasks.length > 0
                            ? tasks
                                .map((task, index) => (
                                    <li key={index} className="list-group-item">
                                        <TaskCheckbox
                                            id={task.id}
                                            name={task.name}
                                            task={task.task}
                                            completed={task.completed}
                                            due_date={task.due_date}
                                        />
                                    </li>
                                ))
                            : <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                                <h4>
                                    No Tasks.
                                    <Link to="/task/new">Create one now</Link>
                                </h4>
                              </div>}
                    </div>  
                </main>
            </div>
      </>
    );
}

export default Tasks;