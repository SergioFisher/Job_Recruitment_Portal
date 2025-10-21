import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
} from "@mui/material";
import axios from "axios";
import MainLayout from "../Layout/MainLayout"; // ✅ import your layout

function AdminSignup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const API_URL = "http://localhost:8080/jobRecruitmentPortal/administrators";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await axios.post(API_URL, formData);
            setSuccess("✅ Admin account created successfully!");
            setTimeout(() => navigate("/administrator"), 2000); // redirect after 2s
        } catch (err) {
            setError("❌ Failed to create admin account. Please try again.");
            console.error(err);
        }
    };

    return (
        <MainLayout>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh" // ✅ leaves space for header/footer
                px={2}
            >
                <Paper
                    elevation={3}
                    sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 400 }}
                >
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                        Admin Registration
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Create an administrator account
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            label="Full Name"
                            name="userName"
                            fullWidth
                            required
                            value={formData.userName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, borderRadius: 2 }}
                        >
                            Register
                        </Button>
                    </form>

                    <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/Login")}>
                        Already have an account? Login
                    </Button>
                </Paper>
            </Box>
        </MainLayout>
    );
}

export default AdminSignup;
