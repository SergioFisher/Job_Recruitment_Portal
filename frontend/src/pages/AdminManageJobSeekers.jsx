import { useEffect, useState } from "react";

export default function AdminManageJobSeekers() {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [newJobSeeker, setNewJobSeeker] = useState({
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        skills: "",
    });

    useEffect(() => {
        fetchJobSeekers();
    }, []);

    const fetchJobSeekers = () => {
        fetch("http://localhost:8080/jobRecruitmentPortal/administrator/jobseekers")
            .then(res => res.json())
            .then(data => setJobSeekers(data))
            .catch(err => console.error(err));
    };

    const deleteJobSeeker = (id) => {
        fetch(`http://localhost:8080/jobRecruitmentPortal/administrator/jobseekers/${id}`, { method: "DELETE" })
            .then(() => fetchJobSeekers())
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
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Job Seekers</h2>

            <ul>
                {jobSeekers.map(js => (
                    <li key={js.id} className="mb-2">
                        {js.firstName} {js.lastName} - {js.email}
                        <button className="ml-4 px-2 py-1 bg-red-600 text-white rounded" onClick={() => deleteJobSeeker(js.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h3 className="mt-6 font-semibold">Add New Job Seeker</h3>
            <form onSubmit={handleAdd} className="flex flex-col gap-2 max-w-md">
                <input type="text" placeholder="First Name" value={newJobSeeker.firstName} onChange={e => setNewJobSeeker({...newJobSeeker, firstName: e.target.value})} required />
                <input type="text" placeholder="Last Name" value={newJobSeeker.lastName} onChange={e => setNewJobSeeker({...newJobSeeker, lastName: e.target.value})} required />
                <input type="email" placeholder="Email" value={newJobSeeker.email} onChange={e => setNewJobSeeker({...newJobSeeker, email: e.target.value})} required />
                <input type="text" placeholder="Location" value={newJobSeeker.location} onChange={e => setNewJobSeeker({...newJobSeeker, location: e.target.value})} />
                <input type="text" placeholder="Skills" value={newJobSeeker.skills} onChange={e => setNewJobSeeker({...newJobSeeker, skills: e.target.value})} />
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded mt-2">Add Job Seeker</button>
            </form>
        </div>
    );
}