import { useEffect, useState } from "react";

export default function AdminManageEmployers() {
    const [employers, setEmployers] = useState([]);
    const [newEmployer, setNewEmployer] = useState({
        companyName: "",
        email: "",
        location: "",
        industry: "",
        website: "",
        role: "EMPLOYER",
    });

    useEffect(() => {
        fetchEmployers();
    }, []);

    const fetchEmployers = () => {
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/employers")
            .then(res => res.json())
            .then(data => setEmployers(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    };

    const deleteEmployer = (id) => {
        fetch(`http://localhost:8080/jobRecruitmentPortal/administrator/employers/${id}`, { method: "DELETE" })
            .then(() => fetchEmployers())
            .catch(err => console.error(err));
    };

    const handleAdd = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/employers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEmployer)
        })
            .then(() => {
                setNewEmployer({
                    companyName: "",
                    email: "",
                    location: "",
                    industry: "",
                    website: "",
                    role: "EMPLOYER"
                });
                fetchEmployers();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-6">
            {/* Header */}
            <header className="bg-white shadow-sm rounded-2xl mb-6">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-blue-600">Manage Employers</h2>
                </div>
            </header>

            {/* Employers List */}
            <section className="flex-1 overflow-y-auto bg-white shadow-lg rounded-2xl p-6 mb-6">
                {employers.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {employers.map(emp => (
                            <li
                                key={emp.id}
                                className="py-4 flex justify-between items-start hover:bg-gray-50 transition rounded-xl px-3"
                            >
                                <div>
                                    <p className="font-semibold text-lg">{emp.companyName || "Unnamed Company"}</p>
                                    <p className="text-gray-500 text-sm">{emp.email} — {emp.location || "N/A"}</p>
                                    {emp.industry && <p className="text-xs text-gray-400">Industry: {emp.industry}</p>}
                                    {emp.website && (
                                        <a
                                            href={emp.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 text-xs underline"
                                        >
                                            {emp.website}
                                        </a>
                                    )}
                                </div>
                                <button
                                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                                    onClick={() => deleteEmployer(emp.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center mt-10 italic">No employers available.</p>
                )}
            </section>

            {/* Add New Employer Form */}
            <section className="bg-white shadow-lg rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Add New Employer</h3>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={newEmployer.companyName}
                        onChange={e => setNewEmployer({ ...newEmployer, companyName: e.target.value })}
                        required
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newEmployer.email}
                        onChange={e => setNewEmployer({ ...newEmployer, email: e.target.value })}
                        required
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={newEmployer.location}
                        onChange={e => setNewEmployer({ ...newEmployer, location: e.target.value })}
                        required
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="text"
                        placeholder="Industry"
                        value={newEmployer.industry}
                        onChange={e => setNewEmployer({ ...newEmployer, industry: e.target.value })}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="text"
                        placeholder="Website"
                        value={newEmployer.website}
                        onChange={e => setNewEmployer({ ...newEmployer, website: e.target.value })}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />

                    <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                        >
                            Add Employer
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
