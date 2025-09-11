import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    axios.post('http://localhost:8080/api/auth/login', form)
      .then(res => {
        setSuccess(true);

        const role = res.data.role;
        const userId = res.data.id;

        const firstName = res.data.firstName || '';
        const lastName = res.data.lastName || '';
        const name = (firstName + ' ' + lastName).trim() || res.data.name || '';
        const email = res.data.email || '';
        localStorage.setItem('role', role);
        if (userId) {
          localStorage.setItem('userId', userId);
        }

        localStorage.setItem('user', JSON.stringify({ name, firstName, lastName, email, id: userId, role }));

        if (role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else if (role === 'EMPLOYER') {
          navigate('/employer-dashboard');
        } else if (role === 'JOB_SEEKER') {
          navigate('/jobseeker-dashboard');
        } else {
          navigate('/');
        }
      })
      .catch(() => setError('Invalid email or password'));
  };

  return (
    <Box minHeight="100vh" minWidth="100vw" display="flex" justifyContent="center" alignItems="center" sx={{ background: 'rgba(240,245,255,0.5)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10 }}>
      <Card sx={{ maxWidth: 420, width: '100%', boxShadow: 6, borderRadius: 4, p: 2, background: 'linear-gradient(135deg, #1976d2 60%, #00bcd4 100%)', mx: 'auto' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: '#fff', fontWeight: 700 }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required sx={{ bgcolor: '#fff', borderRadius: 2 }} />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required sx={{ bgcolor: '#fff', borderRadius: 2 }} />
            <Button type="submit" variant="contained" color="secondary" size="large" sx={{ fontWeight: 600, borderRadius: 2, mt: 2 }}>Login</Button>
          </form>
          {error && <Typography color="error" mt={2} textAlign="center">{error}</Typography>}
          {success && <Typography color="success.main" mt={2} textAlign="center">Login successful!</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
