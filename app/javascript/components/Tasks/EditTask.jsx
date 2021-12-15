import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import TaskForm from '../TaskComponents/TaskForm';

const EditTask = () => {
    const [name, setName] = useState('');
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const setData = (data) => {
        setName(data.name);
        setTask(data.task);
        setDate(data.date);
        setCategory(data.category);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const url = `/api/v1/tasks/update/${id}`;

        const body = {
            name: name,
            task: task.replace(/\n/g, '<br> <br>'),
            due_date: date,
            category: category,
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
            .catch(() => navigate('/tasks'));
    }, []);

    return (
        <TaskForm
            edit={true}
            onSubmit={onSubmit}
            name={name}
            setName={setName}
            task={task}
            setTask={setTask}
            date={moment(date).format('YYYY-MM-DDTHH:mm')}
            setDate={setDate}
            category={category}
            setCategory={setCategory}
            cancel={`/task/${id}`}
        />
    );
};

export default EditTask;
