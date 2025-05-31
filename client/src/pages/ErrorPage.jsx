import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you have react-router-dom for navigation
import { motion } from 'framer-motion'; // For animations
import { AlertCircle, Home, RefreshCw } from 'lucide-react'; // Icons for the page

const ErrorPage = ({ statusCode = 404, message }) => {
  // Determine title and default message based on status code
  const title = message || (statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong');
  const defaultMessage =
    statusCode === 404
      ? "Oops! The page you're looking for doesn't exist."
      : "We're sorry, but an unexpected error occurred. Please try again.";

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.2, // Stagger children elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 font-inter text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 text-center max-w-md w-full border border-gray-100 dark:border-gray-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <AlertCircle className="w-20 h-20 mx-auto mb-6 text-red-500 dark:text-red-400" />
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8"
          variants={itemVariants}
        >
          {message || defaultMessage}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants}
        >
          <Link to="/">
            <button className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </button>
          </Link>
          {statusCode !== 404 && ( // Only show refresh for non-404 errors
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Reload Page
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
