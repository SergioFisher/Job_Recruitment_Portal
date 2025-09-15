import React, { useState } from "react";
import {
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    Chip,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";

function JobListings() {
    // Hard-coded job data in ZAR
    const jobs = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "Tech Corp",
            location: "Durban",
            description:
                "We are looking for a skilled React developer to join our frontend team. You will work on building user interfaces and improving UX.",
            employmentType: "Full-time",
            salary: 45000,
        },
        {
            id: 2,
            title: "Backend Engineer",
            company: "CPUT Labs",
            location: "Cape Town",
            description:
                "Experienced in Java and Spring Boot. Responsible for building REST APIs and integrating with frontend systems.",
            employmentType: "Contract",
            salary: 60000,
        },
        {
            id: 3,
            title: "UI/UX Designer",
            company: "Creative Studio",
            location: "Johannesburg",
            description:
                "Design engaging interfaces and collaborate with developers to implement user-friendly designs.",
            employmentType: "Part-time",
            salary: 30000,
        },
        {
            id: 4,
            title: "Data Analyst",
            company: "FinData Solutions",
            location: "Pretoria",
            description:
                "Work with business teams to analyze data, build dashboards, and provide insights for decision-making.",
            employmentType: "Full-time",
            salary: 52000,
        },
        {
            id: 5,
            title: "IT Support Technician",
            company: "HelpDesk SA",
            location: "Durban",
            description:
                "Provide technical support to staff, troubleshoot hardware/software issues, and maintain IT infrastructure.",
            employmentType: "Full-time",
            salary: 28000,
        },
        {
            id: 6,
            title: "Cloud Engineer",
            company: "AWS Partners",
            location: "Cape Town",
            description:
                "Manage and optimize cloud infrastructure, ensuring high availability and security of cloud resources.",
            employmentType: "Full-time",
            salary: 75000,
        },
        {
            id: 7,
            title: "Mobile App Developer",
            company: "AppWorks",
            location: "Johannesburg",
            description:
                "Develop mobile applications for Android and iOS platforms using Flutter and React Native.",
            employmentType: "Full-time",
            salary: 50000,
        },
        {
            id: 8,
            title: "Cybersecurity Specialist",
            company: "SecureNet",
            location: "Durban",
            description:
                "Implement and monitor security systems, conduct penetration tests, and train staff on security best practices.",
            employmentType: "Contract",
            salary: 68000,
        },
        {
            id: 9,
            title: "AI/ML Engineer",
            company: "SmartAI Labs",
            location: "Cape Town",
            description:
                "Build and deploy machine learning models for predictive analytics and automation systems.",
            employmentType: "Full-time",
            salary: 90000,
        },
        {
            id: 10,
            title: "Project Manager",
            company: "Tech Solutions",
            location: "Johannesburg",
            description:
                "Oversee software projects, manage agile teams, and ensure projects are delivered on time and within budget.",
            employmentType: "Full-time",
            salary: 70000,
        },
    ];

    // State for modal
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cvLink: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleApply = (job) => {
        setSelectedJob(job);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ name: "", email: "", cvLink: "" });
    };

    const handleSubmit = () => {
        console.log("Application submitted:", formData, "For job:", selectedJob);
        alert(`Application submitted for ${selectedJob.title}!`);
        handleClose();
    };

    return (
        <Box mt={6} px={3}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Latest Job Listings
            </Typography>

            <Grid container spacing={3}>
                {jobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                        <Card
                            sx={{
                                height: "100%",
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: "0.3s",
                                "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {job.title}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {job.company}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {job.location}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2" paragraph>
                                    {job.description.length > 160
                                        ? job.description.slice(0, 160) + "..."
                                        : job.description}
                                </Typography>
                                <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                                    <Chip
                                        label={job.employmentType}
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Chip
                                        label={`R ${job.salary.toLocaleString()}`}
                                        color="success"
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, borderRadius: 2 }}
                                    fullWidth
                                    onClick={() => handleApply(job)}
                                >
                                    Apply
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Application Form Modal */}
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        label="Full Name"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        label="Email Address"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        label="CV / Portfolio Link"
                        name="cvLink"
                        fullWidth
                        value={formData.cvLink}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit Application
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default JobListings;
