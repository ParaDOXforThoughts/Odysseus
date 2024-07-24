import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Header from './Components/Shared/Header';
import Footer from './Components/Shared/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/job-seeker" element={<JobSeekerDashboard />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/" element={
              <>
                <h1 className="text-3xl font-bold">Welcome to Odysseus</h1>
                <p className="mt-4">Choose your role above to get started.</p>
              </>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;