import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

export default function HomePage() {
    const [job, setJob] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(
            `/jobs?title=${encodeURIComponent(job)}&location=${encodeURIComponent(location)}`
        );
    };

    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center text-center px-4 py-20">
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
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 py-3 flex items-center justify-center hover:bg-blue-700 transition"
                    >
                        <Search className="w-5 h-5 mr-2" /> Search
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}
