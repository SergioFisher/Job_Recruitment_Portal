import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

// ApplyToJob Component
function ApplyToJob({ jobId, jobSeekerId, onClose, open }) {
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
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMessage('Failed to submit application.');
      }
    } catch {
      setMessage('Error occurred.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Apply to Job</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            label="Cover Letter"
            fullWidth
            multiline
            minRows={4}
            value={coverLetter}
            onChange={e => setCoverLetter(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Upload Resume (PDF, DOC, DOCX)
            </Typography>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileChange} 
              style={{ marginTop: 8 }} 
            />
          </Box>
          {message && (
            <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Submit Application</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// JobSeekerDashboard Component
function JobSeekerDashboard() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'JOB_SEEKER',
    resume: 'resume.pdf',
    skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS'],
    applications: []
  });
  const [jobs, setJobs] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch jobs from API
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/joblistings');
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    
    // Simulate fetching applications
    const mockApplications = [
      { id: 1, jobTitle: 'Frontend Developer', company: 'Tech Corp', status: 'Pending', date: '2023-05-15' },
      { id: 2, jobTitle: 'Backend Developer', company: 'Data Systems', status: 'Accepted', date: '2023-04-20' },
      { id: 3, jobTitle: 'UI/UX Designer', company: 'Creative Solutions', status: 'Rejected', date: '2023-03-10' }
    ];
    setProfile(prev => ({...prev, applications: mockApplications}));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setApplyDialogOpen(true);
  };

  const handleApplyClose = () => {
    setApplyDialogOpen(false);
    setSelectedJobId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'success';
      case 'Rejected': return 'error';
      default: return 'warning';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JobSeeker Dashboard
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Profile" />
          <Tab label="Applications" />
          <Tab label="Job Listings" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Profile Information
          </Typography>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Details
              </Typography>
              <Typography><strong>Name:</strong> {profile.name}</Typography>
              <Typography><strong>Email:</strong> {profile.email}</Typography>
              <Typography><strong>Role:</strong> {profile.role}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.skills.map((skill, index) => (
                  <Chip key={index} label={skill} color="primary" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resume
              </Typography>
              <Typography>{profile.resume}</Typography>
              <Button variant="contained" sx={{ mt: 2 }}>
                Upload New Resume
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Your Applications
          </Typography>
          {profile.applications.length === 0 ? (
            <Typography>You haven't applied to any jobs yet.</Typography>
          ) : (
            profile.applications.map((app) => (
              <Card key={app.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{app.jobTitle}</Typography>
                  <Typography color="textSecondary">{app.company}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Chip label={app.status} color={getStatusColor(app.status)} />
                    <Typography variant="body2">Applied on: {app.date}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      )}

      {tabValue === 2 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Available Job Listings
          </Typography>
          {jobs.length === 0 ? (
            <Typography>No jobs available at the moment.</Typography>
          ) : (
            jobs.map(job => (
              <Card key={job.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                    {job.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip label={job.location} variant="outlined" />
                    <Chip label={job.employmentType} variant="outlined" />
                    <Chip label={`$${job.salary}/year`} variant="outlined" />
                  </Box>
                  <Button 
                    variant="contained" 
                    onClick={() => handleApplyClick(job.id)}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      )}

      <ApplyToJob 
        jobId={selectedJobId} 
        jobSeekerId={1} // This should come from user authentication
        onClose={handleApplyClose}
        open={applyDialogOpen}
      />
    </Box>
  );
}

export default JobSeekerDashboard;