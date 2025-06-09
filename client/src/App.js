import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Menu from "./components/Menu";
import Task from "./components/Task";
import EffortList from "./components/EffortList";
import Gantt from "./components/Gantt";
import AlarmHistory from "./components/AlarmHistory";
import MasterEdit from "./components/MasterEdit";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/task" element={<Task />} />
            <Route path="/effort_list" element={<EffortList />} />
            <Route path="/gantt" element={<Gantt />} />
            <Route path="/alarm_history" element={<AlarmHistory />} />
            <Route path="/master_edit" element={<MasterEdit />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default App;
