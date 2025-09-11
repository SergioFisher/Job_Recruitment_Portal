import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Card, CardContent, Grid, TextField, Button, MenuItem } from '@mui/material';

function Application() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobSeekerId, setJobSeekerId] = useState('');
  const [jobListingId, setJobListingId] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().slice(0, 16));

  useEffect(() => {
    axios.get('http://localhost:8080/api/applications')
      .then(res => setApplications(Array.isArray(res.data) ? res.data : []))
      .catch(() => setApplications([]));
    axios.get('http://localhost:8080/api/joblistings')
      .then(res => setJobs(res.data))
      .catch(() => setJobs([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/applications', {
      jobListing_id: jobListingId,
      jobSeeker_id: jobSeekerId,
      applicationDate,
      status
    }).then(() => {

      axios.get('http://localhost:8080/api/applications')
        .then(res => setApplications(res.data));
    });
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Application Center
      </Typography>
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Apply for a Job
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="JobSeeker ID"
            value={jobSeekerId}
            onChange={e => setJobSeekerId(e.target.value)}
            required
            size="small"
          />
          <TextField
            select
            label="Job Listing"
            value={jobListingId}
            onChange={e => setJobListingId(e.target.value)}
            required
            size="small"
            style={{ minWidth: 200 }}
          >
            {jobs.map(job => (
              <MenuItem key={job.id} value={job.id}>{job.title}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Application Date"
            type="datetime-local"
            value={applicationDate}
            onChange={e => setApplicationDate(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            size="small"
            style={{ minWidth: 120 }}
          >
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="ACCEPTED">ACCEPTED</MenuItem>
            <MenuItem value="REJECTED">REJECTED</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">Apply</Button>
        </form>
      </Box>
      <Typography variant="h6" gutterBottom>
        All Applications
      </Typography>
      <Grid container columns={12} spacing={2}>
        {Array.isArray(applications) && applications.length === 0 && (
          <Grid gridColumn="span 12">
            <Typography>No applications found.</Typography>
          </Grid>
        )}
        {Array.isArray(applications) && applications.map(app => (
          <Grid gridColumn="span 6" key={app.applicationId || app.id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">JobSeeker: {app.jobSeeker?.name || app.jobSeeker_id}</Typography>
                <Typography variant="subtitle2">Job: {app.jobListing?.title || app.jobListing_id}</Typography>
                <Typography variant="body2">Date: {app.appliedDate || app.applicationDate}</Typography>
                <Typography variant="body2">Status: {app.status}</Typography>
                {app.coverLetter && <Typography variant="body2">Cover Letter: {app.coverLetter}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Application;
