import React from 'react';
import { Typography, Box } from '@mui/material';

function Employer() {
  return (
    <Box mt={4} textAlign="center">
      <Typography variant="h4" gutterBottom>
        Employer Dashboard
      </Typography>
      <Typography variant="body1">
        Post jobs and manage your listings here.
      </Typography>
    </Box>
  );
}

export default Employer;
