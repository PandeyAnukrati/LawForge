import React from 'react';
import { Clock, FileText, Eye, Info, ShieldCheck } from 'lucide-react';
import { motion, useInView } from 'framer-motion'; // Import motion and useInView
import { useRef } from 'react'; // Import useRef

const historyData = [
  {
    id: 1,
    filename: 'Service_Agreement_2024.pdf',
    date: 'May 20, 2025',
    status: 'Analyzed',
    riskScore: 'Low',
    summary: 'Contains indemnity clauses with moderate liabilities.',
  },
  {
    id: 2,
    filename: 'Privacy_Policy.docx',
    date: 'May 18, 2025',
    status: 'Analyzed',
    riskScore: 'Moderate',
    summary: 'Data retention terms flagged for vague definitions.',
  },
  {
    id: 3,
    filename: 'NDA_ClientX.txt',
    date: 'May 12, 2025',
    status: 'Pending Review',
    riskScore: 'Pending',
    summary: 'Uploaded but not yet analyzed.',
  },
];

const StatusBadge = ({ status }) => {
  const color =
    status === 'Analyzed'
      ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200';

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${color}`}>
      {status}
    </span>
  );
};

const RiskBadge = ({ risk }) => {
  const map = {
    Low: 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200',
    Moderate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200',
    High: 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200',
    Pending: 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${map[risk]}`}>
      {risk}
    </span>
  );
};

const History = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // Trigger when 30% of the container is visible

  // Variants for the main heading
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.17, 0.67, 0.83, 0.67], // Custom cubic-bezier for a unique bounce-like feel
      },
    },
  };

  // Variants for each individual card
  const cardItemVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.85,
      rotateX: -10, // Slight tilt for 3D effect
      transformOrigin: 'bottom center', // Pivot point for rotation
    },
    visible: (i) => ({ // Allows access to index `i` for custom delay
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.15, // Staggered delay based on index
        duration: 0.9,   // Longer duration for dramatic effect
        ease: [0.22, 1, 0.36, 1], // Custom "ease out expo" curve
        type: 'spring', // Combine with spring for bounciness
        stiffness: 80,
        damping: 15,
      },
    }),
  };

  // Variants for the footer text
  const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: historyData.length * 0.15 + 0.5 } }, // Delay after cards
  };

  return (
    <section className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-20 px-6 font-jakarta">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <motion.h1
          className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} // Animate based on useInView
          variants={headerVariants}
        >
          Document History
        </motion.h1>

        <motion.div
          ref={ref} // Attach ref to the container
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          // We don't need `whileInView` here as `animate` is handled by `isInView`
        >
          {historyData.map((doc, index) => (
            <motion.div
              key={doc.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-6"
              variants={cardItemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"} // Animate based on useInView
              custom={index} // Pass index to variants for staggered delay
              whileHover={{
                scale: 1.05,
                y: -5, // Lift slightly
                boxShadow: "0px 15px 25px rgba(0,0,0,0.15)", // More prominent shadow
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate w-3/4">
                  <FileText className="inline-block mr-2 text-blue-500" />
                  {doc.filename}
                </h3>
                <StatusBadge status={doc.status} />
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {doc.date}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"> {/* Added line-clamp for summary */}
                <Info className="w-4 h-4 inline-block mr-1 text-purple-400" />
                {doc.summary}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <RiskBadge risk={doc.riskScore} />
                <button className="text-sm flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
                  <Eye className="w-4 h-4" /> View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Text */}
        <motion.div
          className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} // Animate based on useInView
          variants={footerVariants}
        >
          <ShieldCheck className="inline w-4 h-4 mr-1 text-green-500" />
          Your document history is securely encrypted and only accessible to you.
        </motion.div>
      </div>
    </section>
  );
};

export default History;