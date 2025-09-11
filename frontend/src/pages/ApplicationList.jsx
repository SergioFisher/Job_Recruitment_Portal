import React, { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getApplications();
                setApplications(data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div>
            <h2>Applications</h2>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <ul>
                    {applications.map((app) => (
                        <li key={app.applicationID}>
                            <strong>Cover Letter:</strong> {app.coverLetter} <br />
                            <strong>Status:</strong> {app.status} <br />
                            <strong>Applied Date:</strong> {app.appliedDate}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ApplicationList;