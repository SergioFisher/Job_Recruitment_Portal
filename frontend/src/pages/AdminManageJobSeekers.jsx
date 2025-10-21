import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminManageJobSeekers() {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [newJobSeeker, setNewJobSeeker] = useState({
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        skills: "",
    });
    const [selectedJobSeekers, setSelectedJobSeekers] = useState([]);

    useEffect(() => {
        fetchJobSeekers();
    }, []);

    const fetchJobSeekers = () => {
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/jobseekers")
            .then(res => res.json())
            .then(data => setJobSeekers(data))
            .catch(err => console.error(err));
    };

    const toggleSelectJobSeeker = (id) => {
        setSelectedJobSeekers(prev =>
            prev.includes(id) ? prev.filter(jsId => jsId !== id) : [...prev, id]
        );
    };

    const deleteSelectedJobSeekers = () => {
        Promise.all(selectedJobSeekers.map(id =>
            fetch(`http://localhost:8080/jobRecruitmentPortal/administrator/jobseekers/${id}`, { method: "DELETE" })
        ))
            .then(() => {
                setSelectedJobSeekers([]);
                fetchJobSeekers();
            })
            .catch(err => console.error(err));
    };

    const handleAdd = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/jobseekers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newJobSeeker)
        })
            .then(() => {
                setNewJobSeeker({ firstName: "", lastName: "", email: "", location: "", skills: "" });
                fetchJobSeekers();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="w-full max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
                    <nav className="space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link to="/administrator/jobs" className="text-gray-700 hover:text-blue-600">Jobs</Link>
                        <Link to="/administrator/jobseekers" className="text-gray-700 hover:text-blue-600">Job Seekers</Link>
                        <Link to="/administrator/employers" className="text-gray-700 hover:text-blue-600">Employers</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-screen-xl mx-auto p-6 flex flex-col md:flex-row gap-8">
                {/* Job Seekers List */}
                <section className="flex-1 flex flex-col bg-white shadow-lg rounded-2xl p-6 w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Seekers</h2>

                    <div className="flex-1 overflow-y-auto max-h-[600px] space-y-4">
                        {jobSeekers.length > 0 ? (
                            jobSeekers.map(js => (
                                <div
                                    key={js.id}
                                    className="flex justify-between items-start bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition w-full"
                                >
                                    <div className="flex items-start gap-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedJobSeekers.includes(js.id)}
                                            onChange={() => toggleSelectJobSeeker(js.id)}
                                            className="w-5 h-5 accent-blue-600 mt-1"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-lg">{js.firstName} {js.lastName}</h3>
                                            <p className="text-gray-500">{js.email}</p>
                                            <p className="text-gray-400 text-sm">{js.location} | Skills: {js.skills}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center mt-10">No job seekers available.</p>
                        )}
                    </div>

                    {/* Delete Selected Button */}
                    <button
                        onClick={deleteSelectedJobSeekers}
                        disabled={selectedJobSeekers.length === 0}
                        className={`mt-4 px-4 py-2 rounded-lg font-semibold text-white transition ${selectedJobSeekers.length > 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}`}
                    >
                        Delete Selected ({selectedJobSeekers.length})
                    </button>
                </section>

                {/* Add New Job Seeker Form */}
                <section className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-6">
                    <h3 className="text-2xl font-bold mb-4">Add New Job Seeker</h3>
                    <form onSubmit={handleAdd} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={newJobSeeker.firstName}
                            onChange={e => setNewJobSeeker({ ...newJobSeeker, firstName: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={newJobSeeker.lastName}
                            onChange={e => setNewJobSeeker({ ...newJobSeeker, lastName: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newJobSeeker.email}
                            onChange={e => setNewJobSeeker({ ...newJobSeeker, email: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newJobSeeker.location}
                            onChange={e => setNewJobSeeker({ ...newJobSeeker, location: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <input
                            type="text"
                            placeholder="Skills"
                            value={newJobSeeker.skills}
                            onChange={e => setNewJobSeeker({ ...newJobSeeker, skills: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Add Job Seeker
                        </button>
                    </form>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 mt-auto">
                <div className="w-full max-w-screen-xl mx-auto text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} JobFinder. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
