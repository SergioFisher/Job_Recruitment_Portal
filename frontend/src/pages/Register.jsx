import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';

function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    profileSummary: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/jobseekers', form)
      .then(() => setSuccess(true));
  };

  return (
    <Box sx={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(240,245,255,0.5)' }}>
      <Box sx={{ maxWidth: 420, width: '100%', boxShadow: 6, borderRadius: 4, p: 2, background: 'linear-gradient(135deg, #1976d2 60%, #00bcd4 100%)' }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: '#fff', fontWeight: 700 }}>
          Jobseeker Registration
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} required sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          <TextField label="Address" name="address" value={form.address} onChange={handleChange} required sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          <TextField label="Profile Summary" name="profileSummary" value={form.profileSummary} onChange={handleChange} multiline minRows={2} required sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          <Button type="submit" variant="contained" color="secondary" size="large" sx={{ fontWeight: 600, borderRadius: 2, mt: 2 }}>Register</Button>
        </form>
        {success && (
          <Typography color="success.main" mt={2} textAlign="center">Registration successful!</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Register;
