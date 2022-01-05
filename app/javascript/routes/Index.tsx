import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Tasks from '../components/Tasks/Tasks';
import Task from '../components/Tasks/Task';
import NewTask from '../components/Tasks/NewTask';
import EditTask from '../components/Tasks/EditTask';

export default (
    <Router>
        <Routes>
            <Route path="/tasks/:desc" element={<Tasks />} />
            <Route path="/task/:id" element={<Task />} />
            <Route path="/task/:id/edit" element={<EditTask />} />
            <Route path="/task/new" element={<NewTask />} />
            <Route path="*" element={<Navigate to="/tasks/all_time" />} />
        </Routes>
    </Router>
);
