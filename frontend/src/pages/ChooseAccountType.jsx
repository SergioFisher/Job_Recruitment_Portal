import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import MainLayout from "../Layout/MainLayout"; // ✅ added layout

function ChooseAccountType() {
    const navigate = useNavigate();

    // Handlers for redirecting
    const handleChoice = (role) => {
        switch (role) {
            case "JOBSEEKER":
                navigate("/register");
                break;
            case "EMPLOYER":
                navigate("/employer");
                break;
            case "ADMIN":
                navigate("/AdminSignup");
                break;
            default:
                break;
        }
    };

    return (
        <MainLayout>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="80vh"
                bgcolor="#f4f6f8"
                px={3}
            >
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Create Your Account
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Please select the type of account you want to create
                </Typography>

                <Grid container spacing={3} mt={2} justifyContent="center">
                    {[
                        { role: "JOBSEEKER", title: "Job Seeker", desc: "Find jobs and apply easily." },
                        { role: "EMPLOYER", title: "Employer", desc: "Post jobs and manage candidates." },
                        { role: "ADMIN", title: "Admin", desc: "Manage the platform and users." }
                    ].map((option) => (
                        <Grid item xs={12} sm={6} md={4} key={option.role}>
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    textAlign: "center",
                                    ":hover": { boxShadow: 6 }
                                }}
                            >
                                <CardActionArea onClick={() => handleChoice(option.role)}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {option.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" mt={1}>
                                            {option.desc}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </MainLayout>
    );
}

export default ChooseAccountType;
