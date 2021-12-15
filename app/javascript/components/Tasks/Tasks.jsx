import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskCheckbox from "../TaskComponents/TaskCheckbox";
import TaskSidebar from "../TaskComponents/TaskSidebar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const onClick = (d) => {
    setCategory(d);
  };

  useEffect(() => {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network failed.");
      })
      .then((response) => {
        setTasks(response);
        setCategories(
          ["all"].concat(
            response
              .map((task) => {
                return task.category.toLowerCase();
              })
              .filter((x) => x)
              .sort()
          )
        );
      })
      .catch(() => navigate("/"));
  }, []);

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
      <div className="container-fluid">
        <div class="row">
          <div className="col-sm-3">
            <main className="container">
              <input
                type="text"
                placeholder="Search Field"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="w-100"
              />
              <p className="mt-3 mb-1">Categories</p>
              <TaskSidebar categories={categories} onClick={onClick} />
            </main>
          </div>
          <div className="col-sm-9">
            <main className="container">
              <div className="text-right mb-3">
                <Link to="/task/new" className="btn custom-button">
                  Create New Task
                </Link>
              </div>
              <div className="row">
                {tasks.length > 0 ? (
                  tasks
                    .filter((task) => {
                      if (
                        (category == "all" ||
                          task.category.toLowerCase().includes(category)) &&
                        (search == "" ||
                          task.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          task.task
                            .toLowerCase()
                            .includes(search.toLowerCase()))
                      ) {
                        return task;
                      }
                    })
                    .map((task, index) => (
                      <li key={index} className="list-group-item">
                        <TaskCheckbox
                          id={task.id}
                          name={task.name}
                          task={task.task}
                          completed={task.completed}
                          due_date={task.due_date}
                          category={task.category}
                        />
                      </li>
                    ))
                ) : (
                  <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                    <h4>
                      No Tasks.
                      <Link to="/task/new">Create one now</Link>
                    </h4>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
