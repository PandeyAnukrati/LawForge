import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import logo from '../../assets/lawLOGO.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white dark:bg-gray-950"> {/* Added dark mode class for consistency */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-0 flex items-center gap-2">
            {/* Adjusted logo size for footer, often slightly smaller or same as nav */}
            <img src={logo} alt="LawForge Logo" className="h-10 w-auto object-contain" />
          </div>

          {/* Navigation */}
          {/* Added About and Contact links */}
          <div className="flex flex-wrap justify-center space-x-6 text-sm font-medium mb-6 md:mb-0">
            <a href="/" className="hover:text-gray-300 transition">Home</a>
            <a href="/analyze" className="hover:text-gray-300 transition">Analyze</a>

            <a href="/about" className="hover:text-gray-300 transition">About</a>
            <a href="/contact" className="hover:text-gray-300 transition">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="https://github.com/PandeyAnukrati" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/anukrati-pandey-92274a2a9/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400"> {/* Added top border for separation */}
          &copy; {new Date().getFullYear()} LawForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;