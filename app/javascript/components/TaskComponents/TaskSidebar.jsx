import React, { useState } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core'

const TaskSidebar = (props) => {  
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const onClick = (category, index) => {
        props.onClick(category);
        setSelectedIndex(index);
    }

    return (
        <div className="sidebar">
            <List disablePadding dense>
                {props.categories
                    .map((category, index) => (
                        <ListItem
                            button
                            key={category}
                            onClick={() => onClick(category, index)}
                            selected={index === selectedIndex}
                        >
                            <ListItemText>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </ListItemText>
                        </ListItem>
                    ))}
            </List>
        </div>
    ); 
  
}; 
  
  
export default TaskSidebar;