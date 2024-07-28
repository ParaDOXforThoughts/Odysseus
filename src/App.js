/******************************************************************************************************************************************************
 *                                                                                                                                                    *
 *                    This React component sets up the main application layout and routing for the Odysseus job matching platform.                    *
 *                             It includes routing for job seekers and recruiters, and a default route for the homepage.                              *
 *                                                                                                                                                    *
 ******************************************************************************************************************************************************/

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Header from './Components/Shared/Header';
import Footer from './Components/Shared/Footer';
import companyLogo from './assets/images/Sailboat-Icon.jpg'; // Update with the path to your image

function App() {
  return (
    <Router>
      {/******************************************************** Main container for the app ******************************************************************/}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">

        {/****************************************** Centered content box with fixed height and styling ******************************************************/}
        <div className="w-full max-w-md h-[812px] bg-white overflow-hidden shadow-lg rounded-3xl">

          {/*********************************************** Flex container for vertical layout ***************************************************************/}
          <div className="flex flex-col h-full">

            {/******************************* Header component, likely contains navigation and branding ******************************************************/}
            <Header />
            <main className="flex-grow overflow-y-auto">

              {/********************************** Routing configuration for different app pages *************************************************************/}
              <Routes>

                {/**************************************** Route for job seeker dashboard ********************************************************************/}
                <Route path="/job-seeker" element={<JobSeekerDashboard />} />

                {/**************************************** Route for recruiter dashboard *********************************************************************/}
                <Route path="/recruiter" element={<RecruiterDashboard />} />

                {/****************************************** Default route for homepage **********************************************************************/}
                <Route path="/" element={
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">

                    {/************************************** Circular placeholder image **********************************************************************/}
                    <img 
                      src={companyLogo} 
                      alt="Circular Placeholder" 
                      className="w-40 h-40 rounded-full mb-8" 
                    />
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Odysseus</h1>
                    <p className="text-lg text-gray-700 mb-8">Your AI-powered job matching platform</p>
                    <div className="space-y-4">

                      {/*************************************** Link for job seekers **************************************************************************/}
                      <Link to="/job-seeker" className="block w-full font-bold bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                        I'm a Job Seeker
                      </Link>

                      {/**************************************** Link for recruiters **************************************************************************/}
                      <Link to="/recruiter" className="block w-full font-bold bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                        I'm a Recruiter
                      </Link>
                    </div>
                  </div>
                } />

                {/********************************* Catch-all route redirects to the homepage *****************************************************************/}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/************************** Footer component, likely contains copyright or additional info *******************************************************/}
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

