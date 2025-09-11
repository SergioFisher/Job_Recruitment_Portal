import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobSeekerId = localStorage.getItem('userId');

  const [form, setForm] = useState({
    coverLetter: '',
    resume: null
  });

  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    if (!form.resume) {
      setMessage('⚠️ Please select a resume file.');
      setSubmitting(false);
      return;
    }


    const formData = new FormData();
    formData.append('jobSeekerId', jobSeekerId);
    formData.append('jobListingId', jobId);
    formData.append('coverLetter', form.coverLetter);
    formData.append('resume', form.resume);

    try {
      const res = await fetch('http://localhost:8080/api/applications/apply-with-resume', {
        method: 'POST',
        body: formData

      });

      if (res.ok) {
        setMessage('✅ Application submitted successfully!');
  setTimeout(() => navigate('/jobseeker-dashboard'), 2000);
      } else {
        const errorText = await res.text();
        setMessage(`❌ Failed to submit application: ${errorText}`);
      }
    } catch (err) {
      setMessage('❌ Error occurred while submitting.');
    }

    setSubmitting(false);
  };

  return (
    <Box mt={4} maxWidth={600} mx="auto" p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" gutterBottom>
        Apply for Job
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Cover Letter"
          name="coverLetter"
          value={form.coverLetter}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          minRows={3}
        />

        <Typography mt={2}>Upload Resume (PDF/DOC/DOCX):</Typography>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          style={{ marginTop: '8px' }}
        />

        {message && (
          <Typography
            color={message.startsWith('✅') ? 'primary' : 'error'}
            sx={{ mt: 2 }}
          >
            {message}
          </Typography>
        )}

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </Button>

          <Button
            sx={{ ml: 2 }}
            onClick={() => navigate('/jobseeker-dashboard')}
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ApplyJob;
