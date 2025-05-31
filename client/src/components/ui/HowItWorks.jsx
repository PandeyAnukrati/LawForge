import React from 'react';
import { FiUpload, FiZap, FiEdit, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion'; // Import motion

const steps = [
  {
    title: 'Upload Your Document',
    description: 'Drag & drop your legal contract, agreement, or policy to begin the analysis.',
    icon: FiUpload,
  },
  {
    title: 'AI-Powered Analysis',
    description: 'Our smart engine reviews and extracts relevant clauses, entities, and risks.',
    icon: FiZap,
  },
  {
    title: 'Edit & Customize',
    description: 'Make modifications directly within the interface for faster iteration.',
    icon: FiEdit,
  },
  {
    title: 'Download or Share',
    description: 'Export your summary, annotated PDF, or share with your legal team.',
    icon: FiDownload,
  },
];

const HowItWorks = () => {
  // Variants for the main section's container (to trigger child animations)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each step animating
        delayChildren: 0.3,   // Initial delay before the first step animates
      },
    },
  };

  // Variants for each individual step (item)
  const itemVariants = {
    hidden: { opacity: 0, x: -100 }, // Start hidden, slide from left
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }, // Slide to its position
  };

  // Variants for the heading and subheading
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative z-10 py-24 bg-white dark:bg-gray-900 font-jakarta overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Animate the main heading */}
        <motion.h2
          className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4"
          initial="hidden"
          whileInView="visible" // Animate when it comes into view
          viewport={{ once: false, amount: 0.5 }} // Re-animate every time, when 50% visible
          variants={headerVariants}
        >
          How It Works
        </motion.h2>
        {/* Animate the subheading */}
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={headerVariants}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }} // Slight delay for subheading
        >
          From upload to download — a seamless AI-enhanced legal document journey.
        </motion.p>

        {/* Animate the container for the steps */}
        <motion.div
          className="space-y-12 relative border-l border-gray-200 dark:border-gray-700"
          variants={containerVariants}
          initial="hidden"
          whileInView="show" // Animate when this container enters the viewport
          viewport={{ once: false, amount: 0.4 }} // Re-animate every time, when 40% visible
        >
          {steps.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={index}
              className="relative pl-12"
              variants={itemVariants} // Apply item animation to each step
              // Adding a subtle hover effect to individual steps
              whileHover={{ scale: 1.02, x: 5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
            >
              <span className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center shadow-md">
                <Icon className="text-purple-600 dark:text-purple-300" size={20} />
              </span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;