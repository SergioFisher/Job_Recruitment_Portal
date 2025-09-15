import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Manage Employers</h2>
            <p className="text-gray-600 mb-4">
              View, approve or remove employer accounts.
            </p>
            <button
                onClick={() => navigate("/dashboard/admin/employers")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go
            </button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Manage Job Seekers</h2>
            <p className="text-gray-600 mb-4">
              View or remove job seeker profiles.
            </p>
            <button
                onClick={() => navigate("/dashboard/admin/jobseekers")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go
            </button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Manage Jobs</h2>
            <p className="text-gray-600 mb-4">
              Delete inappropriate or expired job postings.
            </p>
            <button
                onClick={() => navigate("/dashboard/admin/jobs")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go
            </button>
          </div>
        </div>
      </div>
  );
}