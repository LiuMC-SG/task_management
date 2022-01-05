import * as React from 'react';
import { Link } from 'react-router-dom';

interface Param {
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
}

const TaskForm: React.FC<Param> = (param) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">{param.edit ? 'Edit task' : 'Add a new task'}</h1>
                    <form
                        onSubmit={(e) => {
                            param.onSubmit(e);
                        }}
                    >
                        <div className="form-group">
                            <label>Task Name:</label>
                            <input
                                name="name"
                                type="text"
                                value={param.name}
                                className="form-control"
                                required
                                onChange={(e) => param.setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Task Description:</label>
                            <textarea
                                name="task"
                                rows={5}
                                value={param.task}
                                className="form-control"
                                required
                                onChange={(e) => param.setTask(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date:</label>
                            <input
                                name="date"
                                type="datetime-local"
                                value={param.due_date}
                                className="form-control"
                                required
                                onChange={(e) => param.setDueDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Category:</label>
                            <input
                                name="category"
                                type="text"
                                value={param.category}
                                className="form-control"
                                onChange={(e) => param.setCategory(e.target.value)}
                            />
                        </div>
                        <div className={'form-group ' + (param.edit ? 'visible' : 'invisible')}>
                            <label className="me-3">Completed: </label>
                            {param.completed ? (
                                <input
                                    checked
                                    id="flexCheckChecked"
                                    name="completed"
                                    type="checkbox"
                                    className={'form-check-input'}
                                    onChange={(e) => param.setCompleted(e.target.value)}
                                />
                            ) : (
                                <input
                                    id="flexCheckChecked"
                                    name="completed"
                                    type="checkbox"
                                    className={'form-check-input'}
                                    onChange={(e) => param.setCompleted(e.target.value)}
                                />
                            )}
                        </div>
                        <button type="submit" className="btn custom-button mt-3 me-2">
                            {param.edit ? 'Update Task' : 'Create Task'}
                        </button>
                        <Link to={param.cancel} className="btn custom-button mt-3">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
