import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    name: string;
    task: string;
    due_date: string;
    category: string;
    completed: boolean;
    onSubmit: Function;
    setName: Function;
    setTask: Function;
    setDueDate: Function;
    setCategory: Function;
    setCompleted: Function;
    edit: boolean;
    cancel: string;
};

const TaskForm: React.FC<Props> = (props) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">{props.edit ? 'Edit task' : 'Add a new task'}</h1>
                    <form
                        onSubmit={(e) => {
                            props.onSubmit(e);
                        }}
                    >
                        <div className="form-group">
                            <label>Task Name:</label>
                            <input
                                name="name"
                                type="text"
                                value={props.name}
                                className="form-control"
                                required
                                onChange={(e) => props.setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Task Description:</label>
                            <textarea
                                name="task"
                                rows={5}
                                value={props.task}
                                className="form-control"
                                required
                                onChange={(e) => props.setTask(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date:</label>
                            <input
                                name="date"
                                type="datetime-local"
                                value={props.due_date}
                                className="form-control"
                                required
                                onChange={(e) => props.setDueDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Category:</label>
                            <input
                                name="category"
                                type="text"
                                value={props.category}
                                className="form-control"
                                onChange={(e) => props.setCategory(e.target.value)}
                            />
                        </div>
                        <div className={'form-group ' + (props.edit ? 'visible' : 'invisible')}>
                            <label className="me-3">Completed: </label>
                            {props.completed ? (
                                <input
                                    checked
                                    id="flexCheckChecked"
                                    name="completed"
                                    type="checkbox"
                                    className={'form-check-input'}
                                    onChange={(e) => props.setCompleted(e.target.value)}
                                />
                            ) : (
                                <input
                                    id="flexCheckChecked"
                                    name="completed"
                                    type="checkbox"
                                    className={'form-check-input'}
                                    onChange={(e) => props.setCompleted(e.target.value)}
                                />
                            )}
                        </div>
                        <button type="submit" className="btn custom-button mt-3 me-2">
                            {props.edit ? 'Update Task' : 'Create Task'}
                        </button>
                        <Link to={props.cancel} className="btn custom-button mt-3">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
