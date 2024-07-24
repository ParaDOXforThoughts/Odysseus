import React from 'react';
import JobSwiperView from '../Components/JobSeeker/JobSwiperView';

const JobSeekerDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Next Opportunity</h1>
      <JobSwiperView />
    </div>
  );
};

export default JobSeekerDashboard;