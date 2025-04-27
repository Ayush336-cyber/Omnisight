import React from 'react';
import logo from 'E:/yolov5/frontend/assets/logo.png';

const Navbar: React.FC = () => (
  <nav className="flex items-center px-6 py-4 bg-gray-900/50 backdrop-blur-md">
    <img src={logo} alt="NavAI OmniSight" className="h-40 w-40 mr-3" />
    <h1 className="text-4xl font-mono neon">NavAI OmniSight</h1>
  </nav>
);

export default Navbar;