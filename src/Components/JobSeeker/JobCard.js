/**
 * JobCard Component
 * 
 * This component displays detailed information about a job posting. It is designed to show individual job cards
 * within the JobSwiperView. Each card includes the job title, company name, location, salary, job type, industry,
 * a description, key requirements, and skills. It also features a company logo displayed to the right of the text details.
 * 
 * Props:
 * - job (object): An object containing job details such as title, company, location, salary, jobType, industry, 
 *   description, requirements, and skills.
 * 
 * Usage:
 * <JobCard job={jobData} />
 */

import React from 'react';
import './JobCard.css';
import Logo from '../../assets/images/Sailboat-Icon.jpg'; // Path to the company logo image

const JobCard = ({ job }) => {
  // Check if job data is provided; if not, display a placeholder message
  if (!job) {
    return <div className="flex items-center justify-center h-full">No job data available</div>;
  }

  // Parse job requirements from JSON format, if available
  const requirements = job.requirements ? JSON.parse(job.requirements) : [];

  // Helper function to render job details with labels
  const renderJobDetail = (label, value) => (
    <p className="text-sm text-gray-700">
      <span className="font-semibold">{label}:</span> {value || 'Not specified'}
    </p>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        {/* Job header section displaying job title, company, and location */}
        <div className="job-header flex items-center">
          {/* Text details on the left */}
          <div className="text-details flex-grow">
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
            <h3 className="text-xl text-gray-600">{job.company}</h3>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
          {/* Company logo displayed to the right of text details */}
          <div className="company-logo">
            <img src={Logo} alt="Company Logo" className="rounded-full" />
          </div>
        </div>

        {/* Job details section */}
        <div className="job-details">
          {renderJobDetail('Salary', job.salary)}
          {renderJobDetail('Job Type', job.jobType)}
          {renderJobDetail('Industry', job.industry)}
        </div>

        {/* Job description section */}
        <div className="job-details">
          <h4 className="text-lg font-semibold mb-2">Job Description:</h4>
          <p className="text-sm text-gray-600">{job.description}</p>
        </div>

        {/* Key requirements section */}
        <div className="job-details">
          <h4 className="text-lg font-semibold mb-2">Key Requirements:</h4>
          <ul className="list-none pl-0">
            {requirements.map((req, index) => (
              <li key={index} className="relative pl-6 mb-2 text-sm text-gray-600">
                <span className="absolute left-0 top-0.5 text-indigo-500">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Skills section */}
        <div className="job-details mt-4">
          <h4 className="text-lg font-semibold mb-2">Skills:</h4>
          <div className="skills flex flex-wrap">
            {job.skills.split(',').map((skill, index) => (
              <span key={index} className="skill-tag bg-gray-200 text-gray-700 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
