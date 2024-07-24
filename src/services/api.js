import axios from 'axios';

const API_URL = 'http://your-api-url.com'; // Replace with your actual API URL

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Add more API calls as needed