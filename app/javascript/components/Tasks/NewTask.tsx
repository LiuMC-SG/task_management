import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../TaskComponents/TaskForm';

const NewTask: React.FC = () => {
    const [name, setName] = React.useState('');
    const [task, setTask] = React.useState('');
    const [due_date, setDueDate] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [completed, setCompleted] = React.useState(false);
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = '/api/v1/tasks/create';

        const body = {
            name: name,
            task: task.replace(/\n/g, '<br> <br>'),
            due_date: due_date,
            category: category,
        };

        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
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
            due_date={due_date}
            setDueDate={setDueDate}
            category={category}
            setCategory={setCategory}
            completed={completed}
            setCompleted={setCompleted}
            cancel={'/tasks/all_time'}
        />
    );
};

export default NewTask;
