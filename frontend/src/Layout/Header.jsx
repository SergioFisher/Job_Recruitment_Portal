import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">JobFinder</h1>
                <nav className="space-x-6">
                    <Link to="/login" className="text-gray-700 hover:text-blue-600">
                        Login
                    </Link>
                    <Link
                        to="/ChooseAccountType"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Register
                    </Link>
                    <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
                        Available Jobs
                    </Link>
                </nav>
            </div>
        </header>
    );
}
