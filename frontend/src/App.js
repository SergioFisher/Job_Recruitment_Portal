import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Register from "./pages/Register";
import JobListings from "./pages/JobListings";
import Login from "./pages/Login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/administrator" element={<AdminDashboard />} />
                <Route path="/dashboard/jobseeker" element={<JobSeekerDashboard />} />
                <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<JobListings />} />
            </Routes>
        </Router>
    );
}

export default App;
