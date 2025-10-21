import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout"; // ✅ adjust path if needed

const loginEndpoints = {
    ADMINISTRATOR: "http://localhost:8080/jobRecruitmentPortal/administrator/login",
    JOBSEEKER: "http://localhost:8080/jobRecruitmentPortal/jobRecruitmentPortal/jobseekers/login",
    EMPLOYER: "http://localhost:8080/jobRecruitmentPortal/jobRecruitmentPortal/employers/login",
};

// ✅ Map roles to redirect paths
const redirectPaths = {
    ADMINISTRATOR: "/AdminDashboard",
    EMPLOYER: "/EmployerDashboard",
    JOBSEEKER: "/JobSeekerDashboard",
};

export default function Login() {
    const [role, setRole] = useState("EMPLOYER"); // default role
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const url = loginEndpoints[role];
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const userData = await res.json();
                console.log(`${role} logged in:`, userData);

                // Save IDs if needed
                if (role === "EMPLOYER" && userData.id) {
                    localStorage.setItem("employerId", userData.id);
                }
                if (role === "JOBSEEKER" && userData.id) {
                    localStorage.setItem("jobSeekerId", userData.id);
                }

                // Save role
                localStorage.setItem("role", role);

                // ✅ Redirect based on role
                navigate(redirectPaths[role] || "/");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <MainLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 shadow-md rounded-2xl w-96"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* Role Dropdown */}
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none"
                        required
                    >
                        <option value="ADMINISTRATOR">Admin</option>
                        <option value="EMPLOYER">Employer</option>
                        <option value="JOBSEEKER">JobSeeker</option>
                    </select>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </MainLayout>
    );
}
