import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as moment from 'moment';
import TaskForm from '../TaskComponents/TaskForm';

const EditTask: React.FC = () => {
    const [name, setName] = React.useState('');
    const [task, setTask] = React.useState('');
    const [due_date, setDueDate] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [completed, setCompleted] = React.useState(false);
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
    };

    const onSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = `/api/v1/tasks/update/${id}`;

        const body = {
            name: name,
            task: task.replace(/\n/g, '<br> <br>'),
            due_date: moment(due_date).utc().format('YYYY-MM-DD HH:mm'),
            category: category,
            completed: completed,
        };

        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
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

    React.useEffect(() => {
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
