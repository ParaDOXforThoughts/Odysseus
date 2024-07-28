/********************************************************************************
 *                            Footer Component                                  *  
 *                                                                              *
 *       This component renders the app's footer, which displays the copyright  *
 *       information for the Odysseus App.                                      *
 *                                                                              *
 ********************************************************************************/ 

import React from 'react';

const Footer = () => (
  <footer className="bg-blue-600 p-4 text-center text-white">
    © {new Date().getFullYear()} Odysseus App
  </footer>
);

export default Footer;