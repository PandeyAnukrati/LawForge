// src/pages/Dashboard.jsx
import React, { useState, useRef } from 'react'; // Import useRef
import { Card, CardContent } from '../components/ui/card';
import { FileText, Users, BarChart, MessageCircle, Clock } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { motion, useInView } from 'framer-motion'; // Import motion and useInView

const Dashboard = () => {
  // Refs for in-view animations
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.5 }); // Animate when 50% in view

  const summaryCardsRef = useRef(null);
  const isSummaryCardsInView = useInView(summaryCardsRef, { once: false, amount: 0.3 }); // Animate when 30% in view

  const activitySectionRef = useRef(null);
  const isActivitySectionInView = useInView(activitySectionRef, { once: false, amount: 0.4 }); // Animate when 40% in view

  // --- Framer Motion Variants ---

  // Header Variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
  };

  // Summary Card Container (for staggering children)
  const summaryCardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each card animation
        delayChildren: 0.2, // Initial delay before first card animates
      },
    },
  };

  // Individual Summary Card Variants
  const summaryCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  // Activity Section Variants
  const activitySectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren", // Animate parent first
        staggerChildren: 0.1, // Stagger list items
        delayChildren: 0.3, // Delay before list items start
      },
    },
  };

  // Activity List Item Variants
  const activityItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };


  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10" ref={headerRef}>
        <motion.div
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back!</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Here's your dashboard overview.</p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={avatarVariants}
        >
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <motion.div
        ref={summaryCardsRef} // Attach ref to the container
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        initial="hidden"
        animate={isSummaryCardsInView ? "visible" : "hidden"} // Controlled by inView state
        variants={summaryCardsContainerVariants} // Apply container staggering
      >
        <motion.div
          key={`summary-card-1-${isSummaryCardsInView}`} // Key for re-animation
          variants={summaryCardVariants}
        >
          <Card className="bg-white dark:bg-gray-900 shadow hover:shadow-lg transition border dark:border-gray-700">
            <CardContent className="p-6 flex items-center space-x-4">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Documents</p>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">124</h2>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          key={`summary-card-2-${isSummaryCardsInView}`} // Key for re-animation
          variants={summaryCardVariants}
        >
          <Card className="bg-white dark:bg-gray-900 shadow hover:shadow-lg transition border dark:border-gray-700">
            <CardContent className="p-6 flex items-center space-x-4">
              <Users className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Users</p>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">42</h2>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          key={`summary-card-3-${isSummaryCardsInView}`} // Key for re-animation
          variants={summaryCardVariants}
        >
          <Card className="bg-white dark:bg-gray-900 shadow hover:shadow-lg transition border dark:border-gray-700">
            <CardContent className="p-6 flex items-center space-x-4">
              <BarChart className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analytics</p>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">87%</h2>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          key={`summary-card-4-${isSummaryCardsInView}`} // Key for re-animation
          variants={summaryCardVariants}
        >
          <Card className="bg-white dark:bg-gray-900 shadow hover:shadow-lg transition border dark:border-gray-700">
            <CardContent className="p-6 flex items-center space-x-4">
              <MessageCircle className="w-8 h-8 text-pink-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Feedback</p>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">12</h2>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Activity Section */}
      <motion.div
        ref={activitySectionRef} // Attach ref to the activity section
        className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow"
        initial="hidden"
        animate={isActivitySectionInView ? "visible" : "hidden"} // Controlled by inView state
        variants={activitySectionVariants} // Apply section variants
      >
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            {[
              { time: '10 mins ago', activity: 'Uploaded NDA_Contract.pdf' },
              { time: '1 hour ago', activity: 'User John added a new document' },
              { time: '2 hours ago', activity: 'System analytics updated' },
              { time: '1 day ago', activity: 'Feedback received from user Anna' },
            ].map((item, i) => (
              <motion.li
                key={`${item.activity}-${i}-${isActivitySectionInView}`} // Key for re-animation
                className="flex items-start space-x-4"
                variants={activityItemVariants} // Apply item variants
              >
                <Clock className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300">{item.activity}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </motion.div>
    </div>
  );
};

export default Dashboard;