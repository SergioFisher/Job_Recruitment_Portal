import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminManageJobs() {
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        location: "",
        employmentType: "",
        status: "Active",
        employer: null
    });
    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        fetchJobs();
        fetchEmployers();
    }, []);

    // Fetch all jobs
    const fetchJobs = () => {
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/jobs")
            .then(res => res.json())
            .then(data => setJobs(data))
            .catch(err => console.error(err));
    };

    // Fetch all employers
    const fetchEmployers = () => {
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/employers")
            .then(res => res.json())
            .then(data => setEmployers(data))
            .catch(err => console.error(err));
    };

    // Delete job by id
    const deleteJob = (id) => {
        fetch(`http://localhost:8080/jobRecruitmentPortal/administrator/jobs/${id}`, {
            method: "DELETE"
        })
            .then(() => fetchJobs())
            .catch(err => console.error(err));
    };

    // Add new job
    const handleAdd = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newJob,
                employer: newJob.employer ? { id: newJob.employer.id } : null
            })
        })
            .then(() => {
                setNewJob({ title: "", description: "", location: "", employmentType: "", status: "Active", employer: null });
                fetchJobs();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
                    <nav className="space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link to="/administrator/jobs" className="text-gray-700 hover:text-blue-600">Jobs</Link>
                        <Link to="/administrator/employers" className="text-gray-700 hover:text-blue-600">Employers</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Jobs</h2>

                {/* Jobs List */}
                <div className="grid gap-4 mb-8">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <p className="text-gray-500">{job.location} | {job.status} | Employer: {job.employer?.companyName || "N/A"}</p>
                            </div>
                            <button
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                onClick={() => deleteJob(job.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>






                {/* Add New Job Form */}
                <div className="bg-white shadow-md rounded-2xl p-6 max-w-md">
                    <h3 className="text-xl font-semibold mb-4">Add New Job</h3>
                    <form onSubmit={handleAdd} className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newJob.title}
                            onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={newJob.description}
                            onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newJob.location}
                            onChange={e => setNewJob({ ...newJob, location: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <input
                            type="text"
                            placeholder="Employment Type"
                            value={newJob.employmentType}
                            onChange={e => setNewJob({ ...newJob, employmentType: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <select
                            value={newJob.employer?.id || ""}
                            onChange={e => {
                                const employer = employers.find(emp => emp.id === parseInt(e.target.value));
                                setNewJob({ ...newJob, employer });
                            }}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">Select Employer</option>
                            {employers.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.companyName}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Add Job
                        </button>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 mt-auto">
                <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} JobRecruitment Portal. All rights reserved.
                </div>
            </footer>
        </div>
    );
}