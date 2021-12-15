import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon, Collapse } from '@material-ui/core';
import { Home, Today, DateRange, CalendarToday, Link, Class, ExpandLess, ExpandMore } from '@material-ui/icons';

const TaskSidebar = (props) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(props.timing);
    const [timeopen, setTimeOpen] = useState(true);
    const [categoryopen, setCategoryOpen] = useState(false);

    const handleTimeClick = () => {
        setTimeOpen(!timeopen);
    };

    const handleCategoryClick = () => {
        setCategoryOpen(!categoryopen);
    };

    const onTimeClick = (time, index) => {
        props.onTimeClick(time);
        setSelectedTimeIndex(index);
    };

    const onCategoryClick = (category, index) => {
        props.onCategoryClick(category);
        setSelectedCategoryIndex(index);
    };

    return (
        <div>
            <List component="nav">
                <ListItem onClick={handleTimeClick}>
                    <ListItemIcon>
                        <Link />
                    </ListItemIcon>
                    <ListItemText>Links</ListItemText>
                    {timeopen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={timeopen} timeout="auto" unmountOnExit>
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
                            onClick={() => onTimeClick('all_time', 'all_time')}
                            selected={selectedTimeIndex === 'all_time'}
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
                            onClick={() => onTimeClick('today', 'today')}
                            selected={selectedTimeIndex === 'today'}
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
                            onClick={() => onTimeClick('upcoming', 'upcoming')}
                            selected={selectedTimeIndex === 'upcoming'}
                            className="ps-sm-5"
                        >
                            <ListItemIcon>
                                <DateRange />
                            </ListItemIcon>
                            <ListItemText>Upcoming</ListItemText>
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
