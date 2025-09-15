import React, { useState, useEffect } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

function ApplyToJob({ jobId, jobSeekerId, onClose }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const formData = new FormData();
    formData.append('jobSeekerId', jobSeekerId);
    formData.append('jobListingId', jobId);
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resume);
    try {
      const res = await fetch('http://localhost:8080/api/applications/apply-with-resume', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setMessage('Application submitted successfully!');
        onClose();
      } else {
        setMessage('Failed to submit application.');
      }
    } catch {
      setMessage('Error occurred.');
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Apply to Job</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            label="Cover Letter"
            fullWidth
            multiline
            minRows={2}
            value={coverLetter}
            onChange={e => setCoverLetter(e.target.value)}
          />
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ marginTop: 16 }} />
          {message && <Typography color={message.includes('success') ? 'primary' : 'error'} sx={{ mt: 1 }}>{message}</Typography>}
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function JobSeekerDashboard() {

  const profile = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'JOB_SEEKER',
    resume: 'Link to resume.pdf',
    applications: [
      { job: 'Frontend Developer', status: 'Pending' },
      { job: 'Backend Developer', status: 'Accepted' }
    ]
  };
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/joblistings')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        JobSeeker Dashboard
      </Typography>
      <Box mb={2}>
        <Typography variant="h6">Profile Info</Typography>
        <Typography>Name: {profile.name}</Typography>
        <Typography>Email: {profile.email}</Typography>
        <Typography>Role: {profile.role}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Resume</Typography>
        <Typography>{profile.resume}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Applications</Typography>
        {profile.applications.map((app, idx) => (
          <Typography key={app.job + '-' + app.status + '-' + idx}>Job: {app.job} | Status: {app.status}</Typography>
        ))}
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Available Jobs</Typography>
        {jobs.length === 0 ? (
          <Typography>No jobs available.</Typography>
        ) : (
          jobs.map(job => (
            <Box key={job.id || job.title + '-' + job.location} mb={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
              <Typography variant="subtitle1">{job.title}</Typography>
              <Typography variant="body2">{job.description}</Typography>
              <Typography variant="body2">Location: {job.location}</Typography>
              <Typography variant="body2">Salary: {job.salary}</Typography>
              <Typography variant="body2">Type: {job.employmentType}</Typography>
              {job.id && (
                <Button variant="outlined" sx={{ mt: 1 }} onClick={() => navigate(`/apply/${job.id}`)}>Apply</Button>
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default JobSeekerDashboard;
