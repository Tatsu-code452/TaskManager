import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { ProjectDetail } from "./features/ProjectDetail/ui/ProjectDetail";
import { ProjectListPage } from "./features/ProjectList/ProjectListPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProjectListPage />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
