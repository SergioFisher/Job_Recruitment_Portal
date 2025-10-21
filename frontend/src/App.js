import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManageEmployers from "./pages/AdminManageEmployers";
import AdminManageJobs from "./pages/AdminManageJobs";
import AdminManageJobSeekers from "./pages/AdminManageJobSeekers";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Register from "./pages/Register";
import JobListings from "./pages/JobListings";
import Login from "./pages/Login";
import JobSeeker from "./pages/JobSeeker";
import Employer from "./pages/Employer";
import Application from "./pages/Application";
import ChooseAccountType from "./pages/ChooseAccountType";
import AdminSignup from "./pages/AdminSignup";
import {Layout} from "lucide-react";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/AdminManageEmployers" element={<AdminManageEmployers />} />
                <Route path="/AdminManageJobs" element={<AdminManageJobs />} />
                <Route path="/AdminManageJobSeekers" element={<AdminManageJobSeekers />} />
                <Route path="/JobSeekerDashboard" element={<JobSeekerDashboard />} />
                <Route path="/EmployerDashboard" element={<EmployerDashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/JobSeekers" element={<JobSeeker/>} />
                <Route path="/employer" element={<Employer/>} />
                <Route path="/Application" element={<Application/>} />
                <Route path="/MainLayout" element={<Layout/>} />
                <Route path="/Footer" element={<Footer/>} />
                <Route path="/Header" element={<Header/>} />
                <Route path="/ChooseAccountType" element={<ChooseAccountType/>} />
                <Route path="/AdminSignup" element={<AdminSignup/>} />



            </Routes>
        </Router>
    );
}

export default App;
