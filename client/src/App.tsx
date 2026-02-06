import "./App.css";
// import { LoginPage } from "./features/auth";
// import { MenuPage } from "./features/menu";
import SimpleApiDemo from "./features/demo";
// import TaskDemo from "./features/task/components/TaskDemo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/task-demo" element={<TaskDemo />} /> */}
                <Route path="/simple-api-demo" element={<SimpleApiDemo />} />
            </Routes>
        </Router>
    );
}

export default App;
