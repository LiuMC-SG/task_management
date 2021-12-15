import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskForm from '../TaskComponents/TaskForm';

const NewTask = () => {
    const [name, setName] = useState('');
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const url = '/api/v1/tasks/create';

        const body = {
            name: name,
            task: task.replace(/\n/g, '<br> <br>'),
            due_date: date,
            category: category,
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: 'POST',
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

    return (
        <TaskForm
            edit={false}
            onSubmit={onSubmit}
            name={name}
            setName={setName}
            task={task}
            setTask={setTask}
            date={date}
            setDate={setDate}
            category={category}
            setCategory={setCategory}
            cancel={'/tasks/all_time'}
        />
    );
};

export default NewTask;
