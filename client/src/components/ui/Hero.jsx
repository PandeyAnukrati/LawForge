import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/Accept terms-cuate.png';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const headingLineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 } },
  };

  const subheadingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.6 } },
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8,
      },
    },
  };

  const buttonItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
        delay: 0.5,
        duration: 1.2,
      },
    },
  };

  const blobVariants = {
    animate: (i) => ({
      x: [0, i % 2 === 0 ? 20 : -20, 0],
      y: [0, i % 2 === 0 ? -10 : 10, 0],
      scale: [1, 1.05, 1],
      rotate: [0, i % 2 === 0 ? 5 : -5, 0],
      transition: {
        x: { duration: 10 + i * 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        y: { duration: 12 + i * 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        scale: { duration: 8 + i, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        rotate: { duration: 15 + i * 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
      },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-[#0f172a] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between lg:py-32">
        {/* Text content */}
        <div className="max-w-xl">
          <h1 className="font-jakarta text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            <motion.span
              className="block"
              initial="hidden"
              animate="visible"
              variants={headingLineVariants}
            >
              Analyze &amp; Generate Legal Documents
            </motion.span>
            <motion.span
              className="block text-blue-600 dark:text-blue-400"
              initial="hidden"
              animate="visible"
              variants={headingLineVariants}
              transition={{ delay: 0.2, ...headingLineVariants.visible.transition }}
            >
              in Seconds
            </motion.span>
          </h1>
          <motion.p
            className="mt-6 text-lg text-gray-600 dark:text-gray-300"
            initial="hidden"
            animate="visible"
            variants={subheadingVariants}
          >
            Upload contracts, NDAs, or any legal file and let <span className="font-semibold text-gray-900 dark:text-white">LegalAnalyzer</span> summarize,
            flag risks, and craft new documents using AI.
          </motion.p>
          <motion.div
            className="mt-10 flex gap-4"
            variants={buttonContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={buttonItemVariants}>
              <Link
                to="/upload"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div variants={buttonItemVariants}>
              <Link
                to={isLoggedIn ? "/dashboard" : "/about"}
                className="inline-block rounded-lg border border-gray-300 dark:border-gray-600 px-6 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isLoggedIn ? "Dashboard" : "Learn More"}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          className="mt-16 lg:mt-0 lg:ml-12"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <img src={img} alt="legal" className="w-150" />
        </motion.div>
      </div>

      {/* Blobs */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-200 dark:bg-blue-900 opacity-40 blur-3xl"
        aria-hidden="true"
        variants={blobVariants}
        custom={0}
        animate="animate"
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-purple-200 dark:bg-purple-900 opacity-30 blur-3xl"
        aria-hidden="true"
        variants={blobVariants}
        custom={1}
        animate="animate"
      />
    </section>
  );
};

export default Hero;
