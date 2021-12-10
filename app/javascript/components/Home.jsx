import React from "react";
import { Link } from "react-router-dom";

export default () => (
    <Link
        to="/tasks"
        className="btn btn-lg custom-button"
        role="button"
    >
        View Tasks
    </Link>
);