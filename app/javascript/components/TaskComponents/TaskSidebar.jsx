import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon, Collapse } from '@material-ui/core';
import { Home, Today, DateRange, CalendarToday, Link, Class, EventBusy, EventAvailable, ExpandLess, ExpandMore } from '@material-ui/icons';

const TaskSidebar = (props) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [selectedStateIndex, setSelectedStateIndex] = useState(props.state);
    const [stateopen, setStateOpen] = useState(true);
    const [categoryopen, setCategoryOpen] = useState(false);

    const handleStateClick = () => {
        setStateOpen(!stateopen);
    };

    const handleCategoryClick = () => {
        setCategoryOpen(!categoryopen);
    };

    const onStateClick = (state, index) => {
        props.onStateClick(state);
        setSelectedStateIndex(index);
    };

    const onCategoryClick = (category, index) => {
        props.onCategoryClick(category);
        setSelectedCategoryIndex(index);
    };

    return (
        <div>
            <List component="nav">
                <ListItem onClick={handleStateClick}>
                    <ListItemIcon>
                        <Link />
                    </ListItemIcon>
                    <ListItemText>Links</ListItemText>
                    {stateopen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={stateopen} timeout="auto" unmountOnExit>
                    <List disablePadding dense>
                        <ListItem
                            button
                            key="home"
                            component={ReactLink}
                            to="/"
                            className="ps-sm-5">
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            key="all_time"
                            component={ReactLink}
                            to="/tasks/all_time"
                            onClick={() => onStateClick('all_time', 'all_time')}
                            selected={selectedStateIndex === 'all_time'}
                            className="ps-sm-5"
                        >
                            <ListItemIcon>
                                <CalendarToday />
                            </ListItemIcon>
                            <ListItemText>All Time</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            key="today"
                            component={ReactLink}
                            to="/tasks/today"
                            onClick={() => onStateClick('today', 'today')}
                            selected={selectedStateIndex === 'today'}
                            className="ps-sm-5"
                        >
                            <ListItemIcon>
                                <Today />
                            </ListItemIcon>
                            <ListItemText>Today</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            key="upcoming"
                            component={ReactLink}
                            to="/tasks/upcoming"
                            onClick={() => onStateClick('upcoming', 'upcoming')}
                            selected={selectedStateIndex === 'upcoming'}
                            className="ps-sm-5"
                        >
                            <ListItemIcon>
                                <DateRange />
                            </ListItemIcon>
                            <ListItemText>Upcoming</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            key="overdue"
                            component={ReactLink}
                            to="/tasks/overdue"
                            onClick={() => onStateClick('overdue', 'overdue')}
                            selected={selectedStateIndex === 'overdue'}
                            className="ps-sm-5"
                        >
                            <ListItemIcon>
                                <EventBusy />
                            </ListItemIcon>
                            <ListItemText>Overdue</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            key="completed"
                            component={ReactLink}
                            to="/tasks/completed"
                            onClick={() => onStateClick('completed', 'completed')}
                            selected={selectedStateIndex === 'completed'}
                            className="ps-sm-5"
                        >
                            <ListItemIcon>
                                <EventAvailable />
                            </ListItemIcon>
                            <ListItemText>Completed</ListItemText>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <List component="nav">
                <ListItem onClick={handleCategoryClick}>
                    <ListItemIcon>
                        <Class />
                    </ListItemIcon>
                    <ListItemText>Categories</ListItemText>
                    {categoryopen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={categoryopen} timeout="auto" unmountOnExit>
                    <List disablePadding dense className="sidebar">
                        {props.categories.map((category, index) => (
                            <ListItem
                                button
                                key={category}
                                onClick={() => onCategoryClick(category, index)}
                                selected={index === selectedCategoryIndex}
                                className="ps-sm-5"
                            >
                                <ListItemText>{category.charAt(0).toUpperCase() + category.slice(1)}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
        </div>
    );
};

export default TaskSidebar;
