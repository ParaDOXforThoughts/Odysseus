/**
 * RecruiterDashboard Component
 * 
 * This component serves as the main dashboard for recruiters.
 * It currently renders the CandidateView component, which handles
 * the candidate swiping functionality.
 */

import React from 'react';
import CandidateView from '../Components/Recruiter/CandidateView';

const RecruiterDashboard = () => (
  <div className="flex flex-col h-full overflow-hidden">
    <CandidateView />
  </div>
);

export default RecruiterDashboard;