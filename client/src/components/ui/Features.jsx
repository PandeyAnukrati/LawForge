import React from 'react';
import { FiUpload, FiFileText, FiSearch, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Upload & Analyze',
    desc: 'Drag‑and‑drop PDFs or DOCX files. Our AI parses them in seconds.',
    icon: <FiUpload className="text-blue-600 dark:text-blue-400" size={32} />,
  },
  {
    title: 'Summary Generator',
    desc: 'Get concise, human‑readable summaries of lengthy legal documents.',
    icon: <FiFileText className="text-blue-600 dark:text-blue-400" size={32} />,
  },
  {
    title: 'Clause Detection',
    desc: 'Automatically identify key clauses and obligations in any contract.',
    icon: <FiSearch className="text-blue-600 dark:text-blue-400" size={32} />,
  },
  {
    title: 'Risk Flags',
    desc: 'AI highlights ambiguous language and potential compliance risks.',
    icon: <FiAlertCircle className="text-blue-600 dark:text-blue-400" size={32} />,
  },
];

const Features = () => {
  // Define variants for the container (the grid of features)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Define variants for each individual feature card (the children)
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Define variants for the header text
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-16 font-jakarta">
      <div className="max-w-7xl mx-auto px-6">
        {/* Animate the main heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          // You might want to keep the header visible after initial animation,
          // so removing viewport here for h2.
          // If you want h2 to re-animate, add whileInView and viewport to it too.
        >
          Powerful Features
        </motion.h2>
        {/* Animate the subheading */}
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          // Same for p tag - generally headers don't re-animate every time.
        >
          Everything you need to understand and craft legal documents—fast.
        </motion.p>

        {/* Animate the grid container and stagger its children */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          // --- CHANGE HERE ---
          // Remove `once: true` from the viewport prop
          // Now it will play 'show' animation every time it enters the viewport
          viewport={{ amount: 0.4 }} // Trigger when 40% of component is visible
        >
          {features.map(({ title, desc, icon }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center text-center bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 transition-shadow"
            >
              {icon}
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;