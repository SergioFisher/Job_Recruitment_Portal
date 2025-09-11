import React from 'react';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box mt={4} textAlign="center">
      <Typography variant="h3" gutterBottom>
        JobSeekers Portal
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Find your dream job or post new opportunities.
      </Typography>
    </Box>
  );
}

export default Home;
