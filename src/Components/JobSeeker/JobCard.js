import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Building, Check, X } from 'lucide-react';

const OdysseusJobCard = ({ job }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-indigo-600 p-4 text-white">
        <h1 className="text-2xl font-bold">Odysseus</h1>
        <p className="text-sm">Your Career Journey</p>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
          </div>
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {job.matchScore}% Match
          </span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-indigo-500 mr-2" />
              <p className="text-gray-700">{job.location}</p>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-indigo-500 mr-2" />
              <p className="text-gray-700">{job.salary}</p>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-indigo-500 mr-2" />
              <p className="text-gray-700">{job.jobType}</p>
            </div>
            <div className="flex items-center">
              <Building className="h-5 w-5 text-indigo-500 mr-2" />
              <p className="text-gray-700">{job.industry}</p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <img 
              src={job.companyLogo || "/api/placeholder/80/80"}
              src={job.companyLogo || "/api/placeholder/80/80"}
              alt={`${job.company} logo`} 
              className="h-20 w-20 rounded-full object-cover border-2 border-indigo-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Job Description:</h3>
          <p className="text-gray-600">{job.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Key Requirements:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills:</h3>
          <div className="flex flex-wrap">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-sm font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-20 p-4 bg-indigo-600">
        <button className="rounded-full bg-white p-4 hover:bg-indigo-100 transition-colors duration-200">
          <X className="h-8 w-8 text-red-600" />
        </button>
        <button className="rounded-full bg-white p-4 hover:bg-indigo-100 transition-colors duration-200">
          <Check className="h-8 w-8 text-green-600" />
        </button>
      </div>
    </div>
  );
};

// Example usage
const App = () => {
  const jobData = {
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    companyLogo: "/api/placeholder/80/80", // Replace with actual company logo URL
    matchScore: 92,
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000 per year",
    jobType: "Full-time",
    industry: "Information Technology",
    description: "Join our innovative team at TechCorp Inc. as we embark on a journey to revolutionize the tech industry. As a Senior Software Engineer, you'll be at the forefront of developing cutting-edge solutions that shape the future.",
    requirements: [
      "5+ years of experience in software development",
      "Strong proficiency in React, Node.js, and AWS",
      "Experience with microservices architecture",
      "Excellent problem-solving and communication skills"
    ],
    skills: ["React", "Node.js", "AWS", "Docker", "Kubernetes", "GraphQL"]
  };

  return <OdysseusJobCard job={jobData} />;
};

export default App;