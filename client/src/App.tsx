import "./App.css";
// import { LoginPage } from "./features/auth";
// import { MenuPage } from "./features/menu";
import SimpleApiDemo from "./features/demo";
import { Login } from "./features/login/";
// import Tasks from "./features/task/";
import { TaskPage } from "./features/tasks";
// import TaskDemo from "./features/task/components/TaskDemo";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/task-demo" element={<TaskDemo />} /> */}
                <Route path="/simple-api-demo" element={<SimpleApiDemo />} />
                <Route path="/" element={<Login />} />
                <Route path="/tasks" element={<TaskPage />} />
                {/* <Route path="/tasks" element={<Tasks />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
