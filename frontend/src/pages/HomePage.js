import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [job, setJob] = useState("");
    const [location, setLocation] = useState("");

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">JobFinder</h1>
                    <nav className="space-x-6">
                        <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                        <Link to="/employer/login" className="text-gray-700 hover:text-blue-600">Employers</Link>
                        <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Job Listings</Link>
                        <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
                        <Link to="/jobseekerdashboard" className="text-gray-700 hover:text-blue-600">JobSeekerDashBoard</Link>
                    </nav>
                </div>
            </header>

            {/* Search Section */}
            <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
                    Find your next job
                </h2>
                <p className="text-lg text-gray-500 mb-8">
                    Search millions of jobs from thousands of websites.
                </p>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-2xl overflow-hidden max-w-3xl w-full">
                    <input
                        type="text"
                        placeholder="Job title, keywords, or company"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        className="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-300 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="City, province, or 'remote'"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-300 focus:outline-none"
                    />
                    <button className="bg-blue-600 text-white px-6 py-3 flex items-center justify-center hover:bg-blue-700 transition">
                        <Search className="w-5 h-5 mr-2" /> Search
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 mt-12">
                <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} JobFinder. All rights reserved.
                </div>
            </footer>
        </div>
    );
}