import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

const TaskSidebar = (props) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState('all_time');

    const onTimeClick = (time, index) => {
        props.onTimeClick(time);
        setSelectedTimeIndex(index);
    };

    const onCategoryClick = (category, index) => {
        props.onCategoryClick(category);
        setSelectedCategoryIndex(index);
    };

    return (
        <div className="sidebar">
            <p className="mt-3 mb-1">Links</p>
            <List disablePadding dense>
                <ListItem button key="home" component={Link} to="/">
                    <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem
                    button
                    key="all_time"
                    component={Link}
                    to="/tasks/all_time"
                    onClick={() => onTimeClick('all_time', 'all_time')}
                    selected={selectedTimeIndex === 'all_time'}>
                    <ListItemText>All Time</ListItemText>
                </ListItem>
                <ListItem
                    button
                    key="today"
                    component={Link}
                    to="/tasks/today"
                    onClick={() => onTimeClick('today', 'today')}
                    selected={selectedTimeIndex === 'today'}>
                    <ListItemText>Today</ListItemText>
                </ListItem>
                <ListItem
                    button
                    key="upcoming"
                    component={Link}
                    to="/tasks/upcoming"
                    onClick={() => onTimeClick('upcoming', 'upcoming')}
                    selected={selectedTimeIndex === 'upcoming'}>
                    <ListItemText>Upcoming</ListItemText>
                </ListItem>
            </List>
            <p className="mt-3 mb-1">Categories</p>
            <List disablePadding dense>
                {props.categories.map((category, index) => (
                    <ListItem
                        button
                        key={category}
                        onClick={() => onCategoryClick(category, index)}
                        selected={index === selectedCategoryIndex}
                    >
                        <ListItemText>{category.charAt(0).toUpperCase() + category.slice(1)}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TaskSidebar;
