import axios from 'axios';

const API_URL = 'http://localhost:3000/works';

export const getWorks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching works:', error);
    throw error;
  }
};

export const getWorkById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching work with ID ${id}:`, error);
    throw error;
  }
};

export const createWork = async (workData) => {
  try {
    const response = await axios.post(API_URL, workData);
    return response.data;
  } catch (error) {
    console.error('Error creating work:', error);
    throw error;
  }
};

export const deleteWork = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting work with ID ${id}:`, error);
    throw error;
  }
};
