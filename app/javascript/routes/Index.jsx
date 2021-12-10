import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Tasks from "../components/Tasks";
import Task from "../components/Task";
import NewTask from "../components/NewTask";
import EditTask from "../components/EditTask";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/task/:id" element={<Task />} />
      <Route path="/task/:id/edit" element={<EditTask />} />
      <Route path="/task/new" element={<NewTask />} />
    </Routes>
  </Router>
);