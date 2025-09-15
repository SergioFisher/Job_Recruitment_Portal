import axios from "axios";

// Backend endpoint
const API_URL = "http://localhost:8080/jobRecruitmentPortal/administrator/login";

// CREATE
export const createAdministrator = async (adminData) => {
    return await axios.post(API_URL, adminData);
};

// READ (single admin)
export const getAdministrator = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

// READ ALL
export const getAllAdministrators = async () => {
    return await axios.get(`${API_URL}/getAll`);
};

// UPDATE
export const updateAdministrator = async (id, adminData) => {
    return await axios.put(`${API_URL}/${id}`, adminData);
};

// DELETE
export const deleteAdministrator = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};