import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

const TaskDropdown = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const options = [
        'Ascending by Title',
        'Descending by Title',
        'Ascending by Dateline',
        'Descending by Dateline',
        'Completion Status',
    ];

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClick = (index) => {
        props.setSort(index);
        handleClose();
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Sort By
                <FilterList />
            </Button>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                {options.map((option, index) => (
                    <MenuItem button key={index} onClick={() => onClick(index)} className="ps-sm-5">
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default TaskDropdown;
