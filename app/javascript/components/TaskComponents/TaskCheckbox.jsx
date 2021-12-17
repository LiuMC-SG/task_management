import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Checkbox, ListItemIcon, Typography } from '@material-ui/core';
import moment from 'moment';

const TaskCheckbox = (props) => {
    const [checked, setChecked] = useState(props.task.completed);

    const onClick = () => {
        setChecked(!checked);
        props.update(props.task);
        const url = `/api/v1/tasks/update/${props.task.id}`;

        const body = {
            name: props.task.name,
            task: props.task.task.replace(/\n/g, '<br> <br>'),
            due_date: props.task.due_date,
            category: props.task.category,
            completed: !checked ? '1' : '0',
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
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((error) => console.log(error.message));
    };

    return (
        <List disablePadding={true}>
            <ListItem>
                <ListItemIcon>
                    <Checkbox checked={checked} onClick={onClick} />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography component="div">
                            <Link to={`/task/${props.task.id}`}>
                                <Typography
                                    component="p"
                                    className={'pb-2 text-truncate' + (checked ? ' completed' : '')}
                                >
                                    {props.task.name}
                                </Typography>
                            </Link>
                        </Typography>
                    }
                    secondary={
                        <Typography component="div">
                            <Typography
                                variant="body1"
                                component="p"
                                className={'task_secondary m-0 text-truncate' + (checked ? ' completed' : '')}
                            >
                                {props.task.task}
                            </Typography>
                            <Typography variant="body2" component="p" className={'task_secondary' + (checked ? ' completed' : '')}>
                                <Typography component="span" classname="pb-1">{'To be completed on: '}</Typography>
                                <Typography
                                    component="span"
                                    className={
                                        moment(props.task.due_date).utc().isBefore(moment()) &&
                                        props.task.completed === false
                                            ? ' text-danger'
                                            : ''
                                    }
                                >
                                    {moment(props.task.due_date).local().format('YYYY-MM-DD HH:mm')}
                                </Typography>
                            </Typography>
                            <Typography variant="caption" component="p" className="task_secondary task_category">
                                {props.task.category}
                            </Typography>
                        </Typography>
                    }
                />
            </ListItem>
        </List>
    );
};

export default TaskCheckbox;
