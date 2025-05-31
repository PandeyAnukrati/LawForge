'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useExtractedText } from '../../context/ExtractedTextContext';
import jsPDF from 'jspdf'; // Import jsPDF library
// Importing Card components for structured layout
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// Importing all necessary Lucide icons for various sections
import { LoaderCircle, AlertCircle, FileText, Lightbulb, UserCheck, Gavel, ClipboardCheck, ScrollText, BookText, Users2, Handshake, Download } from 'lucide-react'; // Added Download icon
// Importing Framer Motion for animations
import { motion, AnimatePresence } from 'framer-motion';
// Importing Shadcn Button for interactive elements
import { Button } from '@/components/ui/button';
// Importing DotLottieReact for the animation
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Getreport() {
  const { extractedText } = useExtractedText();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPartyInvolved, setSelectedPartyInvolved] = useState(null);

  const mainContentRef = useRef(null);

  useEffect(() => {
    if (!extractedText) {
      console.log('No extractedText yet, skipping fetch');
      setData(null);
      setError(null);
      return;
    }

    async function fetchData() {
      console.log('Starting fetchData with extractedText:', extractedText);
      setLoading(true);
      setError(null);
      setData(null);

      try {
        console.log('Sending POST request to /api/gemini/generate-text');

        const res = await fetch('http://localhost:3000/api/gemini/generate-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: extractedText }),
        });

        console.log('Response status:', res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error('API returned error text:', errorText);
          throw new Error('API error: ' + res.statusText + ' - ' + errorText);
        }

        const result = await res.json();
        console.log('Raw API response JSON:', result);

        const match = result.text.match(/```json\n([\s\S]*?)```/);
        console.log('Regex match result:', match);

        const jsonText = match ? match[1] : '{}';
        console.log('Extracted JSON text:', jsonText);

        const parsed = JSON.parse(jsonText);
        console.log('Parsed JSON object:', parsed);

        setData(parsed);
        if (parsed.partiesInvolved && parsed.partiesInvolved.length > 0) {
          setSelectedPartyInvolved(parsed.partiesInvolved[0]);
        } else {
          setSelectedPartyInvolved(null);
        }

      } catch (err) {
        console.error('FetchData error:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
        console.log('FetchData complete, loading set to false');
      }
    }

    fetchData();
  }, [extractedText]);

  // --- PDF Download Function ---
  const handleDownloadPdf = () => {
    if (!data) {
      alert('No analysis data available to download.');
      return;
    }

    const doc = new jsPDF();
    let yOffset = 15; // Initial Y offset
    const margin = 15; // Left/Right margin
    const maxWidth = 210 - 2 * margin; // A4 width (210mm) - margins

    // Helper to add content and manage page breaks
    const addContent = (text, size, isBold = false, x = margin, lineHeight = 7) => {
      doc.setFontSize(size);
      if (isBold) doc.setFont('helvetica', 'bold');
      else doc.setFont('helvetica', 'normal');

      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach(line => {
        if (yOffset + lineHeight > doc.internal.pageSize.height - margin) { // Check for page break
          doc.addPage();
          yOffset = margin;
        }
        doc.text(line, x, yOffset);
        yOffset += lineHeight;
      });
      doc.setFont('helvetica', 'normal'); // Reset font style
    };

    // Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Document Analysis Report', margin, yOffset);
    doc.setFont('helvetica', 'normal');
    yOffset += 15;

    // Summary
    addContent('Summary:', 14, true);
    addContent(data.summary, 11, false, margin, 6);
    yOffset += 10;

    // Parties Involved
    if (data.partiesInvolved && data.partiesInvolved.length > 0) {
      addContent('Parties Involved:', 14, true);
      data.partiesInvolved.forEach(party => {
        addContent(`• ${party}`, 11, false, margin + 5, 6);
      });
      yOffset += 10;
    }

    // Key Clauses
    if (data.keyClauses && data.keyClauses.length > 0) {
      addContent('Key Clauses:', 14, true);
      data.keyClauses.forEach(clause => {
        addContent(`• ${clause.title}:`, 11, true, margin + 5);
        addContent(clause.description, 10, false, margin + 10, 5);
        yOffset += 5;
      });
      yOffset += 10;
    }

    // Compliance
    if (data.compliance) {
      addContent('Compliance:', 14, true);
      addContent(data.compliance, 11, false, margin, 6);
      yOffset += 10;
    }

    // Issues
    if (data.issues && data.issues.length > 0) {
      addContent('Identified Issues:', 14, true);
      data.issues.forEach(issue => {
        addContent(`• ${issue}`, 11, false, margin + 5, 6);
      });
      yOffset += 10;
    }

    // Recommendations
    if (data.recommendations && data.recommendations.length > 0) {
      addContent('Recommendations:', 14, true);
      data.recommendations.forEach(rec => {
        addContent(`• ${rec}`, 11, false, margin + 5, 6);
      });
      yOffset += 10;
    }

    // Terminologies
    if (data.terminologies && Object.keys(data.terminologies).length > 0) {
      addContent('Legal Terminologies:', 14, true);
      Object.entries(data.terminologies).forEach(([term, definition]) => {
        addContent(`• ${term}:`, 11, true, margin + 5);
        addContent(definition, 10, false, margin + 10, 5);
        yOffset += 5;
      });
      yOffset += 10;
    }

    doc.save('NDA_Analysis_Report.pdf');
  };

  // Framer Motion Variants (rest of your variants remain the same)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const placeholderVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-gray-900 dark:text-white leading-tight"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-400 dark:to-purple-300">
          Document Analysis Report
        </span> 📄
      </motion.h1>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center mt-20 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md mx-auto border border-gray-100 dark:border-gray-700"
          >
            <div className="w-32 h-32 mb-4">
              <DotLottieReact
                src="https://lottie.host/eec37f30-9104-40dd-93f6-25342970de93/AWo4u1sMxb.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </div>
            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Analyzing your document...</p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-2">This might take a moment as AI processes the content.</p>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div
            key="error"
            variants={placeholderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center text-red-600 dark:text-red-400 mt-20 p-8 bg-red-50 dark:bg-red-950 rounded-xl shadow-xl max-w-md mx-auto border border-red-200 dark:border-red-700"
          >
            <AlertCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Error: {error}</h2>
            <p className="mt-2 text-lg">Please try uploading the document again or check your network connection.</p>
          </motion.div>
        )}

        {!data && !loading && !error && (
          <motion.div
            key="no-data"
            variants={placeholderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center text-gray-500 dark:text-gray-400 mt-20 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md mx-auto border border-gray-100 dark:border-gray-700"
          >
            <FileText className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold">Ready for Analysis</h2>
            <p className="text-lg mt-2">Upload a document to get a comprehensive AI-powered report.</p>
          </motion.div>
        )}

        {/* Display report content when data is available */}
        {data && !loading && (
          <motion.div
            key="report-content"
            ref={mainContentRef}
            className="max-w-4xl mx-auto space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Download PDF Button - Added here */}
            <motion.div variants={cardItemVariants} className="text-right mb-8">
              <Button
                onClick={handleDownloadPdf}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center transition-transform transform hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Report as PDF
              </Button>
            </motion.div>

            {/* Summary Section */}
            <motion.div variants={cardItemVariants}>
              <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                  <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-400 flex items-center">
                    <Lightbulb className="mr-3 h-7 w-7 text-yellow-500" />
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <CardDescription className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {data.summary || "No summary available."}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Parties Involved - The unique and beautiful section */}
            <motion.div variants={cardItemVariants} className="relative p-8 bg-white/60 dark:bg-gray-800/60 rounded-3xl shadow-xl border border-gray-100/70 dark:border-gray-700/70 backdrop-blur-lg w-full">
              <motion.div
                className="flex items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Users2 className="h-9 w-9 text-green-600 dark:text-green-400 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Parties Involved
                </h2>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
                {data.partiesInvolved && data.partiesInvolved.length > 0 ? (
                  data.partiesInvolved.map((party, i) => (
                    <motion.div
                      key={party}
                      className="flex-1 w-full"
                      initial={{ scale: 1, opacity: 0.8, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                      animate={selectedPartyInvolved === party ? {
                        scale: 1.05,
                        opacity: 1,
                        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2), 0px 0px 30px rgba(66, 153, 225, 0.4)",
                        background: "linear-gradient(135deg, var(--tw-gradient-stops))",
                      } : {
                        scale: 1,
                        opacity: 0.7,
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                        background: "linear-gradient(135deg, var(--tw-gradient-stops))",
                      }}
                      whileHover={{ scale: 1.02, boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      onClick={() => setSelectedPartyInvolved(party)}
                    >
                      <Button
                        className={`w-full h-auto py-5 text-xl font-semibold rounded-xl transition-all duration-300 transform
                                    ${selectedPartyInvolved === party
                                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                                      : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 dark:from-gray-700 dark:to-gray-600 dark:text-gray-200 shadow-md'
                                    }
                                    hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
                      >
                        <Handshake className="w-6 h-6 mr-3" />
                        {party}
                      </Button>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-lg">No parties identified in the document.</p>
                )}
              </div>

              {selectedPartyInvolved && (
                <motion.div
                  key={selectedPartyInvolved}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-10 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl text-white text-center text-3xl font-bold flex items-center justify-center min-h-[180px] cursor-pointer hover:scale-[1.005] transition-transform duration-200"
                >
                  {selectedPartyInvolved} Selected
                </motion.div>
              )}
            </motion.div>

            {/* Key Clauses Section */}
            <motion.div variants={cardItemVariants}>
              <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                  <CardTitle className="text-2xl font-bold text-purple-700 dark:text-purple-400 flex items-center">
                    <Gavel className="mr-3 h-7 w-7 text-purple-500" />
                    Key Clauses
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  {data.keyClauses && data.keyClauses.length > 0 ? (
                    <div className="space-y-6">
                      {data.keyClauses.map((clause, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{clause.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{clause.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No specific key clauses identified.</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Compliance Section */}
            {data.compliance && (
              <motion.div variants={cardItemVariants}>
                <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                    <CardTitle className="text-2xl font-bold text-orange-700 dark:text-orange-400 flex items-center">
                      <ClipboardCheck className="mr-3 h-7 w-7 text-orange-500" />
                      Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{data.compliance}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Issues Section */}
            {data.issues && data.issues.length > 0 && (
              <motion.div variants={cardItemVariants}>
                <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                    <CardTitle className="text-2xl font-bold text-red-700 dark:text-red-400 flex items-center">
                      <AlertCircle className="mr-3 h-7 w-7 text-red-500" />
                      Identified Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300 space-y-3 text-lg leading-relaxed">
                      {data.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Recommendations Section */}
            {data.recommendations && data.recommendations.length > 0 && (
              <motion.div variants={cardItemVariants}>
                <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                    <CardTitle className="text-2xl font-bold text-teal-700 dark:text-teal-400 flex items-center">
                      <ScrollText className="mr-3 h-7 w-7 text-teal-500" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300 space-y-3 text-lg leading-relaxed">
                      {data.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Terminologies Section */}
            {data.terminologies && Object.keys(data.terminologies).length > 0 && (
              <motion.div variants={cardItemVariants}>
                <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                    <CardTitle className="text-2xl font-bold text-rose-700 dark:text-rose-400 flex items-center">
                      <BookText className="mr-3 h-7 w-7 text-rose-500" />
                      Legal Terminologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <div className="space-y-6">
                      {Object.entries(data.terminologies).map(([term, desc], i) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{term}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}