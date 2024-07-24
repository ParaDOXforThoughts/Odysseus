import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-blue-600 p-4">
    <nav>
      <ul className="flex space-x-4">
        <li><Link to="/job-seeker" className="text-white hover:underline">Job Seeker</Link></li>
        <li><Link to="/recruiter" className="text-white hover:underline">Recruiter</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;