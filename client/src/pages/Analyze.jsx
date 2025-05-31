import React, { useState } from 'react';
import { UploadCloud, FileSearch, Sparkles, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExtractedText } from '../../context/ExtractedTextContext';
import { useNavigate } from 'react-router-dom';

const Analyze = () => {
  const [file, setFile] = useState(null);
  const [previewName, setPreviewName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { extractedText, setExtractedText } = useExtractedText();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewName(selectedFile?.name || '');
    setExtractedText('');
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:3000/api/documents/extract-text', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to extract text');
        }

        const data = await response.json();
        setExtractedText(data.text || 'No text extracted.');
        setIsEditing(false);

       
   
      } catch (error) {
        alert('Error extracting text: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      alert('Saved changes');
    }
    setIsEditing(!isEditing);
  };

  const handleReupload = () => {
    setFile(null);
    setPreviewName('');
    setExtractedText('');
    setIsEditing(false);
  };

  const handleGetReport = () => {
  navigate("/get-report")
  };

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-20 px-6 font-jakarta">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
          }}
        >
          Upload Legal Documents and Edit
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
          }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
        >
          Upload your document, review and edit the extracted content, then generate a comprehensive report tailored to your
          needs.
        </motion.p>

        {!extractedText && (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-10 max-w-3xl mx-auto border border-gray-200 dark:border-gray-700"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0, scale: 0.8, rotateX: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                rotateX: 0,
                transition: {
                  duration: 1.0,
                  ease: 'easeOut',
                  type: 'spring',
                  stiffness: 80,
                  damping: 15,
                  delay: 0.3,
                },
              },
            }}
          >
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Upload Legal Document
            </label>

            <motion.div
              className="relative border-2 border-dashed border-blue-400 dark:border-blue-600 rounded-3xl p-10 cursor-pointer transition-all duration-300"
              whileHover={{
                scale: 1.02,
                borderColor: 'rgba(99, 102, 241, 1)',
                boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center space-y-4">
                <UploadCloud className="text-blue-600 dark:text-blue-400 w-10 h-10" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {previewName || 'Drag & drop your document here or click to browse (PDF, DOCX, TXT)'}
                </p>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={!file || loading}
              className="mt-8 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
              whileHover={{ scale: 1.02, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {loading ? 'Analyzing...' : 'Upload Document'}
            </motion.button>
          </motion.form>
        )}

        {extractedText && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
            <label htmlFor="extractedText" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Extracted Text ({isEditing ? 'Editable' : 'Read-only'})
            </label>
            <textarea
              id="extractedText"
              rows={12}
              className="w-full p-4 border rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              readOnly={!isEditing}
            ></textarea>

            <div className="flex justify-center space-x-6 mt-8">
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={handleReupload}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold shadow-md transition"
              >
                Reupload
              </button>
              <button
                onClick={handleGetReport}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md transition"
              >
                Get Report
              </button>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        <motion.div
          className="mt-20 grid gap-10 md:grid-cols-3"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
        >
          {/* Feature 1 */}
          <motion.div
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-3xl shadow-xl"
            variants={{
              hidden: { opacity: 0, y: 80, rotateY: 10 },
              visible: {
                opacity: 1,
                y: 0,
                rotateY: 0,
                transition: {
                  duration: 0.7,
                  ease: 'easeOut',
                  type: 'spring',
                  stiffness: 90,
                  damping: 12,
                },
              },
            }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FileSearch className="text-purple-600 dark:text-purple-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Intelligent Document Parsing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Effortlessly parse legal documents into structured, easy-to-understand segments.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-3xl shadow-xl"
            variants={{
              hidden: { opacity: 0, y: 80, rotateY: 10 },
              visible: {
                opacity: 1,
                y: 0,
                rotateY: 0,
                transition: {
                  duration: 0.7,
                  ease: 'easeOut',
                  type: 'spring',
                  stiffness: 90,
                  damping: 12,
                },
              },
            }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="text-green-600 dark:text-green-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Clause Extraction & Classification</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Detect critical terms like indemnity, liabilities, penalties, and obligations. Get a risk score and relevant
              references.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-3xl shadow-xl"
            variants={{
              hidden: { opacity: 0, y: 80, rotateY: 10 },
              visible: {
                opacity: 1,
                y: 0,
                rotateY: 0,
                transition: {
                  duration: 0.7,
                  ease: 'easeOut',
                  type: 'spring',
                  stiffness: 90,
                  damping: 12,
                },
              },
            }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit className="text-blue-600 dark:text-blue-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Edit Document Before Report</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Review and modify the extracted document text before generating your comprehensive legal report.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Analyze;
