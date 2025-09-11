import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    employmentType: '',
    isActive: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/joblistings')
      .then(res => res.json())
      .then(data => setJobs(data));
    fetch('http://localhost:8080/api/applications')
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ title: '', description: '', location: '', salary: '', employmentType: '', isActive: true });
    setMessage('');
  };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setSubmitting(true);
    setMessage('');
    try {
      const userId = localStorage.getItem('userId');
      const url = `http://localhost:8080/api/joblistings?userId=${userId}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Job posted successfully!');
        setForm({ title: '', description: '', location: '', salary: '', employmentType: '', isActive: true });
        // Optionally update jobs here
        setJobs(prev => [...prev, data]);
      } else {
        setMessage('Failed to post job.');
      }
    } catch (err) {
      setMessage('Error occurred.');
    }
    setSubmitting(false);
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8080/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setApplications(applications => applications.map(app => app.applicationId === applicationId ? { ...app, status: newStatus } : app));
      }
    } catch {}
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Employer Dashboard
      </Typography>
      <Box mb={2}>
        <Typography variant="h6">All Job Listings</Typography>
        {jobs.length === 0 ? (
          <Typography>No jobs found.</Typography>
        ) : (
          jobs.map(job => (
            <Box key={job.id || job.title + '-' + job.location} mb={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
              <Typography variant="subtitle1">{job.title}</Typography>
              <Typography variant="body2">{job.description}</Typography>
              <Typography variant="body2">Location: {job.location}</Typography>
              <Typography variant="body2">Salary: {job.salary}</Typography>
              <Typography variant="body2">Type: {job.employmentType}</Typography>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>Applicants:</Typography>
              {applications.filter(app => app.jobListing && (app.jobListing.jobId === job.id)).length === 0 ? (
                <Typography>No applications yet.</Typography>
              ) : (
                applications.filter(app => app.jobListing && (app.jobListing.jobId === job.id)).map(app => (
                  <Box key={app.applicationId} p={1} border={1} borderColor="grey.200" borderRadius={1} mb={1}>
                    <Typography variant="body2">Seeker: {app.jobSeeker && app.jobSeeker.name} | Status: {app.status}</Typography>
                    <Typography variant="body2">Cover Letter: {app.coverLetter}</Typography>
                    <Select
                      value={app.status}
                      onChange={e => handleStatusChange(app.applicationId, e.target.value)}
                      size="small"
                      sx={{ mt: 1, minWidth: 120 }}
                    >
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="REVIEWED">REVIEWED</MenuItem>
                      <MenuItem value="REJECTED">REJECTED</MenuItem>
                      <MenuItem value="HIRED">HIRED</MenuItem>
                    </Select>
                  </Box>
                ))
              )}
            </Box>
          ))
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2 }}>
        Post New Job
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post New Job</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            minRows={2}
            value={form.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Location"
            name="location"
            fullWidth
            value={form.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Salary"
            name="salary"
            fullWidth
            value={form.salary}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Employment Type"
            name="employmentType"
            fullWidth
            value={form.employmentType}
            onChange={handleChange}
          />
          {message && <Typography color={message.includes('success') ? 'primary' : 'error'} sx={{ mt: 1 }}>{message}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting} variant="contained" color="primary">Post</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EmployerDashboard;
