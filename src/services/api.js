/**
 * API Service
 * 
 * This module provides functions to interact with the backend API.
 * It handles API calls for jobs, candidates, and matching functionality.
 */

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

/**
 * Handles and logs API errors
 * @param {Error} error - The error object
 * @param {string} functionName - The name of the function where the error occurred
 */
const handleApiError = (error, functionName) => {
  console.error(`Error in ${functionName}:`, error);
  if (error.response) {
    console.error('Data:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
  throw error;
};

/**
 * Fetches all jobs from the API
 * @returns {Promise<Array>} A promise that resolves to an array of job objects
 */
export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    console.log('API response for getJobs:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'getJobs');
  }
};

/**
 * Creates a new job
 * @param {Object} jobData - The job data to be created
 * @returns {Promise<Object>} A promise that resolves to the created job object
 */
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    console.log('API response for createJob:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'createJob');
  }
};

/**
 * Fetches all candidates from the API
 * @returns {Promise<Array>} A promise that resolves to an array of candidate objects
 */
export const getCandidates = async () => {
  try {
    const response = await axios.get(`${API_URL}/candidates`);
    console.log('API response for getCandidates:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'getCandidates');
  }
};

/**
 * Creates a new candidate
 * @param {Object} candidateData - The candidate data to be created
 * @returns {Promise<Object>} A promise that resolves to the created candidate object
 */
export const createCandidate = async (candidateData) => {
  try {
    const response = await axios.post(`${API_URL}/candidates`, candidateData);
    console.log('API response for createCandidate:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'createCandidate');
  }
};

/**
 * Fetches matches for a specific job
 * @param {number} jobId - The ID of the job to fetch matches for
 * @returns {Promise<Array>} A promise that resolves to an array of matching candidate objects
 */
export const getMatches = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/matches/${jobId}`);
    console.log('API response for getMatches:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'getMatches');
  }
};