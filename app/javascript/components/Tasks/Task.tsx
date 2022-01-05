import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as moment from 'moment';

const Task: React.FC = () => {
    const [task, setTask] = React.useState({ id: '', name: '', task: '', due_date: '', category: '', completed: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const url = `/api/v1/show/${id}`;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network error.');
            })
            .then((response) => setTask(response))
            .catch(() => navigate('/tasks'));
    }, []);

    const addHtmlEntities = (str: string) => {
        return String(str).replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    };

    const deleteTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const url = `/api/v1/destroy/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch(url, {
            method: 'DELETE',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network error.');
            })
            .then(() => navigate('/tasks/all_time'))
            .catch((error) => console.log(error.message));
    };

    const editTask = () => {
        const editpath = `/task/${id}/edit`;
        navigate(editpath);
    };

    return (
        <div className="">
            <div className="container py-5">
                <h1 className="text-wrap text-break text-center">{addHtmlEntities(task.name)}</h1>
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-3">
                        <ul className="list-group">
                            <h5 className="mb-2">Due Date (24 Hrs)</h5>
                            <div className="mb-3">{moment(task.due_date).local().format('DD-MMM-YYYY HH:mm')}</div>
                            <h5 className="mb-2">Category</h5>
                            <div className="text-wrap text-break mb-3">
                                {task.category === '' ? 'None' : addHtmlEntities(task.category)}
                            </div>
                            <h5 className="mb-2 mb-3">Completion Status</h5>
                            <div className="mb-3">{task.completed ? 'Completed' : 'Not Completed'}</div>
                            <Link to="/tasks/all_time" className="btn custom-button mt-3">
                                Back to Tasks
                            </Link>
                        </ul>
                    </div>
                    <div className="col-lg-7">
                        <h5 className="mb-2">Description</h5>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `${addHtmlEntities(task.task)}`,
                            }}
                            className="text-wrap text-break"
                        />
                    </div>
                    <div className="col-lg-2">
                        <button type="button" className="btn btn-danger" onClick={editTask}>
                            Edit Task
                        </button>
                        <h1></h1>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => {
                                if (window.confirm('Do you wish to delete this task?')) deleteTask(e);
                            }}
                        >
                            Delete Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;
