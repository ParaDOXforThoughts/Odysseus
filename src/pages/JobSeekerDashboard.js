/**
 * JobSeekerDashboard Component
 * 
 * This component serves as the main dashboard for job seekers.
 * It currently renders the JobSwiperView component, which handles
 * the job swiping functionality.
 */

import React from 'react';
import JobSwiperView from '../Components/JobSeeker/JobSwiperView';

const JobSeekerDashboard = () => (
  <div className="flex flex-col h-full overflow-hidden">
    <JobSwiperView />
  </div>
);

export default JobSeekerDashboard;