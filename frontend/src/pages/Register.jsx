import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/jobseekers" element={<AdminJobSeekers />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

// Navigation Component
function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">JobPortal</Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/admin/jobseekers" className="hover:underline">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Home Component
function Home() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to JobPortal</h1>
        <p className="text-gray-600 mb-6">Find your dream job or recruit the best talent</p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Register as JobSeeker
          </Link>
          <Link to="/admin/jobseekers" className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition">
            View JobSeekers
          </Link>
        </div>
      </div>
    </div>
  );
}

// Registration Component (updated to store in localStorage)
function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    profileSummary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing jobseekers from localStorage
    const stored = JSON.parse(localStorage.getItem("jobseekers")) || [];

    // Add new jobseeker
    stored.push(form);

    // Save back to localStorage
    localStorage.setItem("jobseekers", JSON.stringify(stored));

    // Redirect to Admin Jobseekers page
    navigate("/admin/jobseekers");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Jobseeker Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            name="profileSummary"
            placeholder="Profile Summary"
            value={form.profileSummary}
            onChange={handleChange}
            rows="3"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already registered?{" "}
          <Link to="/admin/jobseekers" className="text-blue-600 hover:underline">
            View all job seekers
          </Link>
        </p>
      </div>
    </div>
  );
}

// Admin JobSeekers Component
function AdminJobSeekers() {
  const [jobseekers, setJobseekers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("jobseekers")) || [];
    setJobseekers(stored);
  }, []);

  const clearAllJobSeekers = () => {
    if (window.confirm("Are you sure you want to clear all jobseeker data?")) {
      localStorage.removeItem("jobseekers");
      setJobseekers([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Registered Jobseekers ({jobseekers.length})
          </h2>
          <div className="flex space-x-2">
            <Link 
              to="/register"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Add New
            </Link>
            {jobseekers.length > 0 && (
              <button 
                onClick={clearAllJobSeekers}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {jobseekers.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">👤</div>
            <p className="text-gray-600 mb-4">No jobseekers registered yet.</p>
            <Link 
              to="/register"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Register First JobSeeker
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Phone</th>
                  <th className="border p-3 text-left">Address</th>
                  <th className="border p-3 text-left">Profile Summary</th>
                </tr>
              </thead>
              <tbody>
                {jobseekers.map((js, i) => (
                  <tr key={i} className="hover:bg-gray-50 even:bg-gray-100">
                    <td className="border p-3 font-medium">{js.firstName} {js.lastName}</td>
                    <td className="border p-3">{js.email}</td>
                    <td className="border p-3">{js.phone}</td>
                    <td className="border p-3">{js.address}</td>
                    <td className="border p-3">{js.profileSummary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Profile Component (for demonstration)
function Profile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Profile Page</h2>
        <p className="text-center text-gray-600">This would be the jobseeker profile page.</p>
        <div className="text-center mt-6">
          <Link to="/admin/jobseekers" className="text-blue-600 hover:underline">
            View all job seekers
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;