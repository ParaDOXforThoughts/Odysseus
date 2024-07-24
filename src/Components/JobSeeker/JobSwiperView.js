import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

const JobSwiperView = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  useEffect(() => {
    // Fetch jobs (replace with actual API call later)
    setJobs([
      { id: 1, title: "Software Engineer", company: "Tech Corp", description: "Exciting role in our dev team" },
      { id: 2, title: "Product Manager", company: "Startup Inc", description: "Lead our product vision" },
      // Add more dummy jobs...
    ]);
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      console.log('Applied to job:', jobs[currentJobIndex]);
    }
    setCurrentJobIndex(prevIndex => (prevIndex + 1) % jobs.length);
  };

  if (jobs.length === 0) return <div>Loading jobs...</div>;

  return (
    <div className="max-w-md mx-auto">
      <JobCard job={jobs[currentJobIndex]} />
    </div>
  );
};

export default JobSwiperView;