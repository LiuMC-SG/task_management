import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import TaskCheckbox from '../TaskComponents/TaskCheckbox';
import TaskSidebar from '../TaskComponents/TaskSidebar';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    const { day } = useParams();
    const [timing, setTiming] = useState(day);

    const onTimeClick = (time) => {
        setTiming(time);
    };

    const onCategoryClick = (d) => {
        setCategory(d);
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
                <div class="row">
                    <div className="col-sm-3">
                        <main className="container">
                            <TaskSidebar
                                categories={categories}
                                timing={timing}
                                onCategoryClick={onCategoryClick}
                                onTimeClick={onTimeClick}
                            />
                        </main>
                    </div>
                    <div className="col-sm-9">
                        <main className="container">
                            <div className="row">
                                <input
                                    type="text"
                                    placeholder="Search Field"
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    className="col-sm-9"
                                />
                                <div className="col-sm-3">
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
                                            if (timing === 'all_time') {
                                                return task;
                                            } else {
                                                if (
                                                    timing === 'today' &&
                                                    moment(task.due_date).utc().isSame(moment(), 'day')
                                                ) {
                                                    return task;
                                                } else if (
                                                    timing === 'upcoming' &&
                                                    moment(task.due_date).utc().isAfter(moment(), 'day')
                                                ) {
                                                    return task;
                                                }
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
