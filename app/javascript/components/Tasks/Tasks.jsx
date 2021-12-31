import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import TaskCheckbox from '../TaskComponents/TaskCheckbox';
import TaskSidebar from '../TaskComponents/TaskSidebar';
import TaskDropdown from '../TaskComponents/TaskDropdown';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [sort_param, setSort] = useState(-1);
    const navigate = useNavigate();
    const { desc } = useParams();
    const [state, setState] = useState(desc);

    const onStateClick = (state) => {
        setState(state);
    };

    const onCategoryClick = (d) => {
        setCategory(d);
    };

    const onSearch = (e) => {
        setSearch(e.target.value);
    };

    const updateTasks = (task) => {
        const temp_tasks = tasks;
        const task_index = temp_tasks.indexOf(task);
        temp_tasks[task_index].completed = !temp_tasks[task_index].completed;
        setTasks(temp_tasks);
    };

    useEffect(() => {
        const url = '/api/v1/tasks/index';
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network failed.');
            })
            .then((response) => {
                setTasks(response);
                setCategories(
                    ['all'].concat(
                        response
                            .map((task) => {
                                return task.category.toLowerCase();
                            })
                            .filter((x) => x)
                            .filter((x, i, a) => a.indexOf(x) == i)
                            .sort(),
                    ),
                );
            })
            .catch(() => navigate('/'));
    }, []);

    return (
        <>
            <section className="jumbotron jumbotron-fluid text-center">
                <div className="container py-5">
                    <h1 className="display-4">Tasks</h1>
                </div>
            </section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        <main className="container">
                            <TaskSidebar
                                categories={categories}
                                state={state}
                                onCategoryClick={onCategoryClick}
                                onStateClick={onStateClick}
                            />
                        </main>
                    </div>
                    <div className="col-sm-9">
                        <main className="container">
                            <div className="row pb-3">
                                <input
                                    type="text"
                                    placeholder="Search Field"
                                    onChange={(e) => onSearch(e)}
                                    className="col-sm-8"
                                />
                                <div className="col-sm-2">
                                    <TaskDropdown setSort={setSort} />
                                </div>
                                <div className="col-sm-2 d-flex justify-content-center">
                                    <Link to="/task/new" className="btn custom-button">
                                        Create New Task
                                    </Link>
                                </div>
                            </div>
                            <div className="row">
                                {tasks.length > 0 ? (
                                    tasks
                                        .filter((task) => {
                                            if (category == 'all' || task.category.toLowerCase().includes(category)) {
                                                return task;
                                            }
                                        })
                                        .filter((task) => {
                                            if (
                                                search == '' ||
                                                task.name.toLowerCase().includes(search.toLowerCase()) ||
                                                task.task.toLowerCase().includes(search.toLowerCase())
                                            ) {
                                                return task;
                                            }
                                        })
                                        .filter((task) => {
                                            if (state === 'all_time') {
                                                return task;
                                            } else if (
                                                state === 'today' &&
                                                moment(task.due_date).utc().isSame(moment(), 'day')
                                            ) {
                                                return task;
                                            } else if (
                                                state === 'upcoming' &&
                                                moment(task.due_date).utc().isAfter(moment(), 'day')
                                            ) {
                                                return task;
                                            } else if (
                                                state === 'overdue' &&
                                                moment(task.due_date).utc().isBefore(moment()) &&
                                                task.completed === false
                                            ) {
                                                return task;
                                            } else if (state === 'completed' && task.completed === true) {
                                                return task;
                                            }
                                        })
                                        .sort((a, b) => {
                                            if (sort_param === 0) {
                                                return a.name.localeCompare(b.name);
                                            } else if (sort_param === 1) {
                                                return -a.name.localeCompare(b.name);
                                            } else if (sort_param === 2) {
                                                return a.due_date > b.due_date ? 1 : a.due_date < b.due_date ? -1 : 0;
                                            } else if (sort_param === 3) {
                                                return b.due_date > a.due_date ? 1 : b.due_date < a.due_date ? -1 : 0;
                                            } else if (sort_param === 4 || sort_param < 0) {
                                                if ((a.completed && b.completed) || (!a.completed && !b.completed)) {
                                                    return a.name.localeCompare(b.name);
                                                } else if (a.completed) {
                                                    return 1;
                                                } else {
                                                    return -1;
                                                }
                                            }
                                        })
                                        .map((task) => (
                                            <li key={task.id} className="list-group-item">
                                                <TaskCheckbox task={task} update={updateTasks} />
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
