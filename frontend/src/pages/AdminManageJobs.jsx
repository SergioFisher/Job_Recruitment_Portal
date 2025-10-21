import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminManageJobs() {
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        location: "",
        employmentType: "Full-Time",
        status: "Active",
        employer: null
    });
    const [employers, setEmployers] = useState([]);
    const [selectedJobs, setSelectedJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
        fetchEmployers();
    }, []);

    const fetchJobs = () => {
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/jobs")
            .then(res => res.json())
            .then(data => setJobs(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    };

    const fetchEmployers = () => {
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/employers")
            .then(res => res.json())
            .then(data => setEmployers(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    };

    const toggleSelectJob = (id) => {
        setSelectedJobs(prev =>
            prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
        );
    };

    const deleteSelectedJobs = () => {
        Promise.all(selectedJobs.map(id =>
            fetch(`http://localhost:8080/jobRecruitmentPortal/administrator/jobs/${id}`, { method: "DELETE" })
        ))
            .then(() => {
                setSelectedJobs([]);
                fetchJobs();
            })
            .catch(err => console.error(err));
    };

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
                setNewJob({ title: "", description: "", location: "", employmentType: "Full-Time", status: "Active", employer: null });
                fetchJobs();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
                    <nav className="space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link to="/administrator/jobs" className="text-gray-700 hover:text-blue-600">Jobs</Link>
                        <Link to="/administrator/employers" className="text-gray-700 hover:text-blue-600">Employers</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-8">
                {/* Jobs List */}
                <section className="flex-1 flex flex-col bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Listings</h2>

                    <div className="flex-1 overflow-y-auto max-h-[600px] space-y-4">
                        {jobs.length > 0 ? (
                            jobs.map(job => (
                                <div
                                    key={job.id}
                                    className="flex justify-between items-start bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition w-full"
                                >
                                    <div className="flex items-start gap-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedJobs.includes(job.id)}
                                            onChange={() => toggleSelectJob(job.id)}
                                            className="w-5 h-5 accent-blue-600 mt-1"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-lg">{job.title || "Untitled Job"}</h3>
                                            <p className="text-gray-500">{job.location || "N/A"} | {job.employmentType || "N/A"}</p>
                                            <p className="text-gray-400 text-sm">Employer: {job.employer?.companyName || "N/A"}</p>
                                        </div>
                                    </div>
                                    <span className={`mt-2 px-2 py-1 text-xs rounded-full font-semibold ${job.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                                        {job.status || "Inactive"}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center mt-10">No jobs available.</p>
                        )}
                    </div>

                    <button
                        onClick={deleteSelectedJobs}
                        disabled={selectedJobs.length === 0}
                        className={`mt-4 px-4 py-2 rounded-lg font-semibold text-white transition ${selectedJobs.length > 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}`}
                    >
                        Delete Selected ({selectedJobs.length})
                    </button>
                </section>

                {/* Add New Job Form */}
                <section className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-6">
                    <h3 className="text-2xl font-bold mb-4">Add New Job</h3>
                    <form onSubmit={handleAdd} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={newJob.title}
                            onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                        <textarea
                            placeholder="Job Description"
                            value={newJob.description}
                            onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none h-24"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newJob.location}
                            onChange={e => setNewJob({ ...newJob, location: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <select
                            value={newJob.employmentType}
                            onChange={e => setNewJob({ ...newJob, employmentType: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                        </select>
                        <select
                            value={newJob.employer?.id || ""}
                            onChange={e => {
                                const employer = employers.find(emp => emp.id === parseInt(e.target.value));
                                setNewJob({ ...newJob, employer });
                            }}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">Select Employer</option>
                            {Array.isArray(employers) && employers.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.companyName || emp.name || "Unnamed Employer"}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Add Job
                        </button>
                    </form>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 mt-auto">
                <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} JobFinder. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
