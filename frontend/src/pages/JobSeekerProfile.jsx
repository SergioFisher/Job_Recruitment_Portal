import { useLocation } from "react-router-dom";

export default function JobSeekerProfile() {
  const location = useLocation();
  const jobSeeker = location.state;

  if (!jobSeeker) {
    return <p className="text-center mt-10">No profile data available.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Jobseeker Profile
        </h2>
        <div className="space-y-4">
          <p><span className="font-semibold">Name:</span> {jobSeeker.firstName} {jobSeeker.lastName}</p>
          <p><span className="font-semibold">Email:</span> {jobSeeker.email}</p>
          <p><span className="font-semibold">Phone:</span> {jobSeeker.phone}</p>
          <p><span className="font-semibold">Address:</span> {jobSeeker.address}</p>
          <div>
            <span className="font-semibold">Profile Summary:</span>
            <p className="mt-1 text-gray-700">{jobSeeker.profileSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
