import { useState } from "react";
import { useNavigate } from "react-router-dom";

const loginEndpoints = [
    { role: "ADMINISTRATOR", url: "http://localhost:8080/jobRecruitmentPortal/administrator/login" },
    { role: "JOBSEEKER", url: "http://localhost:8080/jobRecruitmentPortal/jobseekers/login" },
    { role: "EMPLOYER", url: "http://localhost:8080/jobRecruitmentPortal/employers/login" },
];

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        console.log("Email entered:", email);
        console.log("Password entered:", password);

        try {
            for (const { role, url } of loginEndpoints) {
                const res = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                console.log("Request body sent:", JSON.stringify({ email, password }));

                if (res.ok) {
                    const userData = await res.json();
                    console.log(`${role} logged in:`, userData);
                    navigate(`/dashboard/${role.toLowerCase()}`);
                    return;
                }
            }
            setError("Invalid email or password");
        } catch (err) {
            console.error("Login error:", err);
            setError("Incorrect email or password.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 shadow-md rounded-2xl w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
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
    );
}