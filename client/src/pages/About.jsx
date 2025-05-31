// src/pages/About.jsx

import React from 'react';
import { Button } from '../components/ui/button'; // Assuming shadcn-ui Button
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import {
  Search,
  Zap,
  ShieldCheck,
  Scale,
  ArrowRight,
} from 'lucide-react';

const About = () => {

  const heroHeaderVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };


  const heroSubheaderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
  };


  const missionTextVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };


  const missionIconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -90 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.0, type: "spring", stiffness: 100, damping: 15, delay: 0.4 } },
  };


  const featuresHeaderVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };


  const featuresCardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
        delayChildren: 0.2,    
      },
    },
  };


  const featureCardItemVariants = {
    hidden: { opacity: 0, rotateX: 90, y: 50, transformOrigin: "top center" },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 90,
        damping: 15
      }
    },
  };


  const ctaTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-800 dark:text-gray-200">

      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-br from-purple-100 to-blue-50 dark:from-[#0f172a] dark:to-[#0f172a] text-center shadow-inner overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white"
            initial="hidden"
            animate="visible"
            variants={heroHeaderVariants}
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-teal-400 dark:to-blue-300">Legal Document Analyzer</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={heroSubheaderVariants}
          >
            Empowering legal professionals with cutting-edge AI for unparalleled document clarity and efficiency.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto bg-white dark:bg-[#0f172a]">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }} 
            variants={missionTextVariants}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Mission: Transform Legal Workflows
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              In an increasingly complex legal landscape, attorneys and legal teams spend countless hours on manual document review. We founded Legal Document Analyzer to change that. Our mission is to harness the power of artificial intelligence to automate mundane tasks, unearth critical information, and provide actionable insights, allowing legal professionals to focus on strategy and client success.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              We believe that by providing intelligent tools, we can significantly reduce operational costs, mitigate risks, and accelerate decision-making in the legal sector.
            </p>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }} 
            variants={missionIconVariants}
          >
            <Scale className="w-32 h-32 text-blue-500 dark:text-purple-400 opacity-70" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 md:px-8 bg-white dark:bg-[#0f172a] shadow-inner">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <motion.h2
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }}
            variants={featuresHeaderVariants}
          >
            How We Empower You
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }}
            variants={featuresHeaderVariants}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            Our cutting-edge features are designed to make your legal document analysis effortless and powerful.
          </motion.p>
        </div>

        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={featuresCardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Re-animate every time
        >
          {/* Feature 1 */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            variants={featureCardItemVariants}
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 inline-flex mb-6">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Deep Content Analysis</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Go beyond simple keyword searches. Our AI understands context, relationships, and nuances within your legal texts.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            variants={featureCardItemVariants}
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-4 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 inline-flex mb-6">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Accelerated Review</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Reduce review times by up to 80% with automated identification of key clauses, entities, and obligations.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            variants={featureCardItemVariants}
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 inline-flex mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Enhanced Accuracy & Compliance</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Minimize human error and ensure adherence to regulatory requirements with intelligent cross-referencing.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 text-center bg-gray-100 dark:bg-[#0f172a]">
        <motion.h2
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.7 }}
          variants={ctaTextVariants}
        >
          Ready to Streamline Your Legal Work?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.7 }}
          variants={ctaTextVariants}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          Join a growing number of legal professionals who trust Legal Document Analyzer for their critical insights.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="lg" className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-blue-600 hover:to-indigo-800 transition-all duration-300 shadow-xl">
            <Link to="/analyze">
              Start Analyzing Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;