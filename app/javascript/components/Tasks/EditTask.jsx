import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import TaskForm from '../TaskComponents/TaskForm';

const EditTask = () => {
    const [name, setName] = useState('');
    const [task, setTask] = useState('');
    const [due_date, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const setData = (data) => {
        setName(data.name);
        setTask(data.task);
        setDueDate(data.due_date);
        setCategory(data.category);
        setCompleted(data.completed);
    };

    const setCompletion = () => {
        setCompleted(!completed);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const url = `/api/v1/tasks/update/${id}`;

        const body = {
            name: name,
            task: task.replace(/\n/g, '<br> <br>'),
            due_date: moment(due_date).utc().format('YYYY-MM-DD HH:mm'),
            category: category,
            completed: completed
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network error.');
            })
            .then((response) => navigate(`/task/${response.id}`))
            .catch((error) => console.log(error.message));
    };

    useEffect(() => {
        const url = `/api/v1/show/${id}`;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network error.');
            })
            .then((response) => setData(response))
            .catch(() => navigate('/tasks/all_time'));
    }, []);

    return (
        <TaskForm
            edit={true}
            onSubmit={onSubmit}
            name={name}
            setName={setName}
            task={task}
            setTask={setTask}
            due_date={moment(due_date).local().format('YYYY-MM-DDTHH:mm')}
            setDueDate={setDueDate}
            category={category}
            setCategory={setCategory}
            completed={completed}
            setCompleted={setCompletion}
            cancel={`/task/${id}`}
        />
    );
};

export default EditTask;
