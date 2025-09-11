import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

function AdminDashboard() {

  const profile = {
    name: 'Admin User',
    email: 'admin@site.com',
    role: 'ADMIN',
    features: ['User Management', 'Reports', 'Analytics']
  };


  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: '', company: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ email: '', company: '', password: '' });
    setMessage('');
  };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setSubmitting(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:8080/api/employers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMessage('Employer created successfully!');
        setForm({ email: '', company: '', password: '' });
      } else {
        setMessage('Failed to create employer.');
      }
    } catch (err) {
      setMessage('Error occurred.');
    }
    setSubmitting(false);
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Admin Dashboard
      </Typography>
      <Box mb={2}>
        <Typography variant="h6">Profile Info</Typography>
        <Typography>Name: {profile.name}</Typography>
        <Typography>Email: {profile.email}</Typography>
        <Typography>Role: {profile.role}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Admin Features</Typography>
        {profile.features.map((feature, idx) => (
          <Typography key={idx}>{feature}</Typography>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2 }}>
        Create Employer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Employer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Company Name"
            name="company"
            fullWidth
            value={form.company}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
          />
          {message && <Typography color={message.includes('success') ? 'primary' : 'error'} sx={{ mt: 1 }}>{message}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting} variant="contained" color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDashboard;
