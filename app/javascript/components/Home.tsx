import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <Link to="/tasks/all_time" className="btn btn-lg custom-button" role="button">
            View Tasks
        </Link>
    );
};

export default Home;