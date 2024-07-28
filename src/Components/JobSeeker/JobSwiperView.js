/**
 * JobSwiperView Component
 * 
 * This component handles the main job swiping functionality for job seekers.
 * It fetches job data, displays job cards, and manages the swiping interaction.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { getJobs } from '../../services/api';
import JobCard from './JobCard';
import MatchScreen from '../Shared/MatchScreen';

const JobSwiperView = () => {
  // State management
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [showMatch, setShowMatch] = useState(false);

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobData = await getJobs();
        setJobs(jobData);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Handle match screen display
  useEffect(() => {
    let timer;
    if (showMatch) {
      timer = setTimeout(closeMatchScreen, 2000);
    }
    return () => clearTimeout(timer);
  }, [showMatch]);

  // Job navigation functions
  const moveToNextJob = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length);
  }, [jobs.length]);

  const closeMatchScreen = useCallback(() => {
    setShowMatch(false);
    moveToNextJob();
  }, [moveToNextJob]);

  // Handle user actions
  const handleApply = useCallback(() => {
    const currentJob = jobs[currentIndex];
    if (currentJob.matchScore >= 90) {
      setShowMatch(true);
    } else {
      moveToNextJob();
    }
  }, [currentIndex, jobs, moveToNextJob]);

  const handleReject = moveToNextJob;

  // Render loading, error, or no jobs states
  if (loading) return <div className="flex items-center justify-center h-full">Loading jobs...</div>;
  if (error) return <div className="flex items-center justify-center h-full text-red-500">{error}</div>;
  if (jobs.length === 0) return <div className="flex items-center justify-center h-full">No jobs available</div>;

  // Main render
  return (
    <div className="flex flex-col h-full">
      {showMatch ? (
        <MatchScreen
          jobSeekerImage={process.env.PUBLIC_URL + '/job-seeker-placeholder.png'}
          companyLogo={jobs[currentIndex].companyLogo || (process.env.PUBLIC_URL + '/company-logo-placeholder.png')}
          onClose={closeMatchScreen}
        />
      ) : (
        <>
          <div className="flex-grow overflow-y-hidden">
            <JobCard job={jobs[currentIndex]} />
          </div>
          <div className="flex justify-around p-2 bg-gray-500 bg-opacity-10">
            <button 
              onClick={handleReject} 
              className="bg-red-500 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center"
            >
              ✕
            </button>
            <button 
              onClick={handleApply} 
              className="bg-green-500 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center"
            >
              ✓
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobSwiperView;