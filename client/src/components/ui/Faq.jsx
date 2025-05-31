import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: 'What types of legal documents can I upload?',
    answer: 'You can upload contracts, NDAs, agreements, and legal policies in PDF or DOCX formats.',
  },
  {
    question: 'Is my document data secure?',
    answer: 'Absolutely. We use industry-grade encryption and never store your documents after processing.',
  },
  {
    question: 'Can I edit the analyzed results?',
    answer: 'Yes, you can modify clauses and content right from the dashboard before downloading or exporting.',
  },
  {
    question: 'Does it replace a human lawyer?',
    answer: 'No. Our platform assists lawyers and users in saving time — it’s not a replacement for legal advice.',
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-20 font-jakarta">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Still curious? We’ve answered some common questions to help you get started.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-gray-50 dark:bg-gray-800 shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-900 dark:text-white"
              >
                {faq.question}
                {openIndex === index ? (
                  <FiChevronUp className="text-purple-600" />
                ) : (
                  <FiChevronDown className="text-purple-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
