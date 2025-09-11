import axios from "axios";


const API_URL = "http://localhost:8080/jobRecruitmentPortal/applications";

// Get all applications
export const getApplications = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching applications:", error);
        throw error;
    }
};

// Create a new application
export const createApplication = async (appData) => {
    try {
        const response = await axios.post("http://localhost:8080/jobRecruitmentPortal/application/create", appData);
        return response.data;
    } catch (error) {
        console.error("Error creating application:", error);
        throw error;
    }
};