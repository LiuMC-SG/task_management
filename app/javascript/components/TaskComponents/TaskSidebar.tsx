import * as React from 'react';
import { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon, Collapse, Divider } from '@material-ui/core';
import {
    Today,
    DateRange,
    CalendarToday,
    Link,
    Class,
    EventBusy,
    EventAvailable,
    ExpandLess,
    ExpandMore,
} from '@material-ui/icons';

interface Props {
    onStateClick: Function;
    onCategoryClick: Function;
    state: string;
    categories: Array<string>;
}

const TaskSidebar: React.FC<Props> = (props) => {
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

    const onStateClick = (state: string, index: string) => {
        props.onStateClick(state);
        setSelectedStateIndex(index);
    };

    const onCategoryClick = (category: string, index: number) => {
        props.onCategoryClick(category);
        setSelectedCategoryIndex(index);
    };

    return (
        <div>
            <List>
                <List component="nav">
                    <ListItem onClick={handleStateClick}>
                        <ListItemIcon>
                            <Link />
                        </ListItemIcon>
                        <ListItemText className="text-truncate">Links</ListItemText>
                        {stateopen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={stateopen} timeout="auto" unmountOnExit>
                        <List disablePadding dense>
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
                                <ListItemText className="text-truncate">All Time</ListItemText>
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
                                <ListItemText className="text-truncate">Today</ListItemText>
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
                                <ListItemText className="text-truncate">Upcoming</ListItemText>
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
                                <ListItemText className="text-truncate">Overdue</ListItemText>
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
                                <ListItemText className="text-truncate">Completed</ListItemText>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                <Divider />
                <List component="nav">
                    <ListItem onClick={handleCategoryClick}>
                        <ListItemIcon>
                            <Class />
                        </ListItemIcon>
                        <ListItemText className="text-truncate">Categories</ListItemText>
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
                                    <ListItemText className="text-capitalize">{category}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </List>
        </div>
    );
};

export default TaskSidebar;
