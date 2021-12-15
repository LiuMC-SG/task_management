import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <Link to="/tasks/all_time" className="btn btn-lg custom-button" role="button">
        View Tasks
    </Link>
);
