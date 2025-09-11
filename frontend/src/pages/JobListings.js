import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Card, CardContent, Grid } from '@mui/material';

function JobListings() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/joblistings')
      .then(res => setJobs(res.data))
      .catch(() => setJobs([]));
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>
      <Grid container spacing={2}>
        {jobs.map(job => (
          <Grid item xs={12} sm={6} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography color="textSecondary">{job.location}</Typography>
                <Typography>{job.description}</Typography>
                <Typography variant="body2">Salary: ${job.salary}</Typography>
                <Typography variant="body2">Type: {job.employmentType}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default JobListings;
