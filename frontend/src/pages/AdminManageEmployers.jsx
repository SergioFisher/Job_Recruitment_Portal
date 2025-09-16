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
            .then(data => setEmployers(data))
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
                setNewEmployer({ companyName: "", email: "", location: "", industry: "", website: "", role: "EMPLOYER" });
                fetchEmployers();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Employers</h2>

            <ul>
                {employers.map(emp => (
                    <li key={emp.id} className="mb-2">
                        {emp.companyName} - {emp.email} - {emp.location}
                        <button className="ml-4 px-2 py-1 bg-red-600 text-white rounded" onClick={() => deleteEmployer(emp.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h3 className="mt-6 font-semibold">Add New Employer</h3>
            <form onSubmit={handleAdd} className="flex flex-col gap-2 max-w-md">
                <input type="text" placeholder="Company Name" value={newEmployer.companyName} onChange={e => setNewEmployer({...newEmployer, companyName: e.target.value})} required />
                <input type="email" placeholder="Email" value={newEmployer.email} onChange={e => setNewEmployer({...newEmployer, email: e.target.value})} required />
                <input type="text" placeholder="Location" value={newEmployer.location} onChange={e => setNewEmployer({...newEmployer, location: e.target.value})} required />
                <input type="text" placeholder="Industry" value={newEmployer.industry} onChange={e => setNewEmployer({...newEmployer, industry: e.target.value})} />
                <input type="text" placeholder="Website" value={newEmployer.website} onChange={e => setNewEmployer({...newEmployer, website: e.target.value})} />
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded mt-2">Add Employer</button>
            </form>
        </div>
    );
}