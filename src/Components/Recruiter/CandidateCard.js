/**
 * CandidateCard Component
 * 
 * This component displays detailed information about a candidate.
 * It's used within the CandidateView to show individual candidate profiles.
 */

import React from 'react';
import './CandidateCard.css';

const CandidateCard = ({ candidate }) => {
  if (!candidate) {
    return <div className="flex items-center justify-center h-full">No candidate data available</div>;
  }

  const renderSkills = (skills) => (
    <div className="flex flex-wrap">
      {skills.map((skill, index) => (
        <span 
          key={index} 
          className={`px-2 py-1 rounded-full text-xs font-semibold mr-2 mb-2 ${
            skill.verified 
              ? 'bg-green-500 bg-opacity-80 text-white' 
              : 'bg-blue-500 bg-opacity-80 text-white'
          }`}
        >
          {skill.name}
        </span>
      ))}
    </div>
  );

  const renderExperience = (experience) => (
    <ul className="space-y-2">
      {experience.map((exp, index) => (
        <li key={index} className="border-b pb-2">
          <h4 className="font-bold">{exp.title}</h4>
          <p className="text-gray-600">{exp.company}</p>
          <p className="text-gray-600">{exp.duration}</p>
          <p className="text-gray-700">{exp.description}</p>
        </li>
      ))}
    </ul>
  );

  const renderAchievements = (achievements) => (
    <ul className="list-none pl-0">
      {achievements.map((achievement, index) => (
        <li key={index} className="relative pl-5 pb-2">
          <span className="absolute left-0 top-0">•</span>
          <p className="text-gray-700 pl-2">{achievement}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4">
        <div className="flex items-start mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{candidate.name}</h2>
            <p className="text-gray-600">{candidate.title}</p>
            <p className="text-gray-600">{candidate.location}</p>
          </div>
          <div className="image-container">
            <img 
              src={candidate.profilePicture} 
              alt="Profile" 
              className="profile-picture"
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Summary</h3>
          <p className="text-gray-700">{candidate.summary}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          {renderSkills(candidate.skills)}
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          {renderExperience(candidate.recentExperience)}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Accomplishments</h3>
          {renderAchievements(candidate.achievements)}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;