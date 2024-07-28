/**
 * CandidateView Component
 * 
 * This component handles the main candidate swiping functionality for recruiters.
 * It fetches candidate data, displays candidate cards, and manages the swiping interaction.
 */

import React, { useState, useEffect, useCallback } from 'react';
import CandidateCard from './CandidateCard';
import MatchScreen from '../Shared/MatchScreen';
import profilePic from '../../assets/images/profile-placeholder.jpeg';
import { getCandidates } from '../../services/api'; // Assume this function exists in your api.js

const CandidateView = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        // Replace this with actual API call when ready
        // const candidatesData = await getCandidates();
        const candidatesData = [
          {
            id: 1,
            name: "Rieve Reynolds",
            title: "Senior Software Engineer",
            profilePicture: profilePic,
            matchScore: 94,
            yearsOfExperience: 4,
            education: "M.S. Computer Science",
            location: "San Francisco, CA",
            topSkill: "Full-stack Development",
            summary: "Experienced software engineer with a strong background in building scalable web applications. Passionate about solving complex problems and mentoring junior developers.",
            skills: [
              { name: "React", verified: true },
              { name: "Node.js", verified: true },
              { name: "Python", verified: false },
              { name: "AWS", verified: true },
              { name: "Docker", verified: false },
              { name: "GraphQL", verified: true }
            ],
            recentExperience: [
              {
                title: "Senior Software Engineer",
                company: "TechInnovate Inc.",
                duration: "2019 - Present",
                description: "Lead developer for cloud-based SaaS products. Improved system performance by 40% and mentored a team of 5 junior developers."
              },
              {
                title: "Software Engineer",
                company: "WebSolutions Co.",
                duration: "2016 - 2019",
                description: "Developed and maintained multiple client websites. Implemented responsive design principles that increased mobile traffic by 60%."
              }
            ],
            achievements: [
              "Awarded 'Employee of the Year' at TechInnovate Inc. in 2021",
              "Published 3 technical articles on Medium with over 50k total views",
              "Open source contributor with 500+ GitHub stars across various projects"
            ]
          },
          // Add more dummy candidates here...
        ];
        setCandidates(candidatesData);
      } catch (error) {
        console.error('Failed to fetch candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleSwipe = useCallback((direction) => {
    if (candidates.length > 0) {
      if (direction === 'right' && candidates[currentIndex].matchScore >= 90) {
        setShowMatch(true);
      } else {
        moveToNextCandidate();
      }
    }
  }, [candidates, currentIndex]);

  const moveToNextCandidate = useCallback(() => {
    if (candidates.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
    }
  }, [candidates.length]);

  const handleViewResume = useCallback(() => {
    if (candidates.length > 0) {
      console.log('Viewing resume for:', candidates[currentIndex].name);
      // Implement resume viewing logic here
    }
  }, [candidates, currentIndex]);

  const closeMatchScreen = useCallback(() => {
    setShowMatch(false);
    moveToNextCandidate();
  }, [moveToNextCandidate]);

  useEffect(() => {
    let timer;
    if (showMatch) {
      timer = setTimeout(closeMatchScreen, 2000);
    }
    return () => clearTimeout(timer);
  }, [showMatch, closeMatchScreen]);

  if (loading) {
    return <div className="h-full flex items-center justify-center text-gray-600">Loading candidates...</div>;
  }

  if (candidates.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-600">No candidates available</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {showMatch ? (
        <MatchScreen
          jobSeekerImage={candidates[currentIndex].profilePicture}
          companyLogo={process.env.PUBLIC_URL + '/company-logo-placeholder.png'}
          onClose={closeMatchScreen}
        />
      ) : (
        <>
          <div className="flex-grow overflow-y-hidden">
            <CandidateCard candidate={candidates[currentIndex]} />
          </div>
          <div className="flex justify-around p-2 bg-gray-100 border-t">
            <button 
              onClick={() => handleSwipe('left')} 
              className="bg-red-500 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center"
            >
              ✕
            </button>
            <button 
              onClick={handleViewResume} 
              className="bg-blue-500 text-white p-2 rounded-full w-14 h-14 flex items-center justify-center"
            >
              CV
            </button>
            <button 
              onClick={() => handleSwipe('right')} 
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

export default CandidateView;