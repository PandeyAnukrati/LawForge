import React from 'react';
import { FiMapPin, FiCheckCircle, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion'; // Import motion

const useCases = [
  {
    title: 'Claim Automation',
    status: 'Ready to bill',
    amount: '$116.52',
    user: 'Chad Kiedis',
    icon: <FiCheckCircle className="text-green-500" />,
    badge: 'Ready to bill',
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'Legal Summarization',
    status: 'Paid',
    amount: '$121.75',
    user: 'Jane Smith',
    icon: <FiCheckCircle className="text-purple-500" />,
    badge: 'Paid',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    title: 'Location Extraction',
    status: 'Active',
    amount: 'Presbyterian Hospital',
    user: 'Millie Richards',
    icon: <FiMapPin className="text-blue-500" />,
    badge: 'Active',
    color: 'bg-blue-100 text-blue-700',
  },
];

const UseCases = () => {
  // Variants for header text
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Variants for the main container (grid of cards) for staggered effect
  const cardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each card
        delayChildren: 0.3,    // Initial delay for the first card
      },
    },
  };

  // Variants for each individual card (item)
  const cardItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8, rotateX: 15 }, // Start hidden, scaled down, slightly rotated
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        type: "spring", // Use spring for a bouncier feel
        stiffness: 100,
        damping: 15
      }
    },
  };

  // Variants for the chart bars (growing up)
  const chartBarVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2 // delay for each bar to start
      }
    }
  };

  // Variants for the chart container to stagger bars
  const chartContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each bar
        delayChildren: 0.5,    // Initial delay for the first bar
      },
    },
  };

  return (
    <section className="relative z-10 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-20 overflow-hidden font-jakarta">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.span
            className="inline-block px-4 py-1 mb-4 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.8 }} // Re-animate every time
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Designed for Legal Intelligence
          </motion.span>
          <motion.h2
            className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.7 }}
            variants={headerVariants}
          >
            Supercharge Your Legal Workflow
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.7 }}
            variants={headerVariants}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            Explore our AI-powered tools crafted for legal teams, researchers, and firms.
          </motion.p>
        </div>

        {/* Use Cases Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }} // Trigger when 40% of container is visible
        >
          {useCases.map((caseItem, index) => (
            <motion.div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
              variants={cardItemVariants} // Apply individual card animation
              whileHover={{
                scale: 1.07, // More pronounced scale
                y: -10,      // Lift up
                boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)", // Deeper shadow
                transition: { type: "spring", stiffness: 300, damping: 20 } // Spring for hover
              }}
              whileTap={{ scale: 0.95 }} // Squash on tap
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${caseItem.color}`}>
                  {caseItem.badge}
                </div>
                {/* Icons typically don't need their own motion component unless you want to animate them separately */}
                {caseItem.icon}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {caseItem.title}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {caseItem.user}
              </div>
              <div className="mt-6">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  Details
                </span>
                <div className="text-md font-medium text-gray-800 dark:text-white">
                  {caseItem.amount}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart Bar Preview */}
        <motion.div
          className="mt-16 mx-auto max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FiBarChart2 /> AI Output Overview
          </h4>
          <motion.div
            className="grid grid-cols-5 gap-4 items-end" // Added items-end to make bars start from bottom
            variants={chartContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }} // Trigger when 60% of chart is visible
          >
            {/* Each bar will use the chartBarVariants */}
            <motion.div style={{ height: '96px' }} className="bg-green-300 dark:bg-green-600 rounded-lg" variants={chartBarVariants}></motion.div>
            <motion.div style={{ height: '64px' }} className="bg-blue-300 dark:bg-blue-600 rounded-lg" variants={chartBarVariants}></motion.div>
            <motion.div style={{ height: '80px' }} className="bg-purple-300 dark:bg-purple-600 rounded-lg" variants={chartBarVariants}></motion.div>
            <motion.div style={{ height: '40px' }} className="bg-green-300 dark:bg-green-600 rounded-lg" variants={chartBarVariants}></motion.div>
            <motion.div style={{ height: '56px' }} className="bg-blue-300 dark:bg-blue-600 rounded-lg" variants={chartBarVariants}></motion.div>
          </motion.div>
          <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Ready</span>
            <span>Approved</span>
            <span>Paid</span>
            <span>Draft</span>
            <span>Flagged</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;