/**
 * MatchScreen Component
 * 
 * This component displays a congratulatory screen when a job seeker
 * matches with a job that has a high match score. It shows the job seeker's
 * image and the company logo.
 */

import React from 'react';

const MatchScreen = ({ jobSeekerImage, companyLogo, onClose }) => {
  // Define fallback images
  const jobSeekerPlaceholder = `${process.env.PUBLIC_URL}/job-seeker-placeholder.png`;
  const companyLogoPlaceholder = `${process.env.PUBLIC_URL}/company-logo-placeholder.png`;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-blue-600 p-4">
      <div className="text-center flex flex-col items-center justify-center h-3/4">
        <h1 className="text-6xl font-bold text-white mb-8" style={{ fontFamily: '"Bradley Hand ITC", cursive' }}>Good Luck!</h1>
        <div className="relative mb-8 flex justify-center" style={{ height: '96px', width: '240px' }}>
          <img 
            src={jobSeekerImage || jobSeekerPlaceholder} 
            alt="Job Seeker" 
            className="w-32 h-32 rounded-full border-2 border-white absolute left-0 z-10 object-cover bg-white"
          />
          <img 
            src={companyLogo || companyLogoPlaceholder} 
            alt="Company Logo" 
            className="w-32 h-32 rounded-full border-2 border-white absolute right-0 object-cover bg-white"
          />
        </div>
        <p className="text-3xl text-white p-10" style={{ fontFamily: '"Bradley Hand ITC", cursive' }}>It's a great fit!!</p>
      </div>
      <p className="text-xs text-white absolute bottom-4">© 2024 Odysseus App</p>
    </div>
  );
};

export default MatchScreen;