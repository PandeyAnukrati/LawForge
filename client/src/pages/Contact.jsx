import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Mail, Phone, MapPin, Send, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const formRef = useRef();

  useEffect(() => {
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key (User ID)
    emailjs.init('Wrr7ZdkJHCUnf72TA'); // <--- Your Public Key
  }, []);

  const contactContentRef = useRef(null);
  const isContactContentInView = useInView(contactContentRef, { once: false, amount: 0.4 });

  const faqSectionRef = useRef(null);
  const isFaqSectionInView = useInView(faqSectionRef, { once: false, amount: 0.5 });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('Sending your message...');

    try {
      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
      await emailjs.sendForm('service_w8v7v2h', 'template_flyp5sk', formRef.current); // <-- Your Service ID and Template ID
      setSubmitMessage('Message sent successfully! We will get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitMessage(`Failed to send message: ${error.text || 'An unknown error occurred.'}`);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction * 100,
      rotateY: direction * 10,
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 70,
        damping: 10,
      },
    },
  };

  const formChildrenContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const faqTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const faqButtonsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const faqButtonItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 overflow-hidden">
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-950 dark:to-indigo-900 text-center shadow-lg overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.7 }}
            variants={headerVariants}
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-teal-400 dark:to-blue-300">Touch</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.7 }}
            variants={headerVariants}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            Have questions, feedback, or need support? We're here to help. Feel free to reach out to us!
          </motion.p>
        </div>
      </section>

      <div
        ref={contactContentRef}
        className="py-16 px-4 md:px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <motion.div
          key={`form-card-${isContactContentInView}`}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/30 dark:border-gray-700/50 transform transition-all duration-300"
          variants={cardVariants}
          custom={-1}
          initial="hidden"
          animate={isContactContentInView ? "visible" : "hidden"}
          whileHover={{ scale: 1.02, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.98 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={formChildrenContainerVariants}
            initial="hidden"
            animate={isContactContentInView ? "visible" : "hidden"}
          >
            <motion.div variants={formItemVariants}>
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 text-base">Name</Label>
              <Input
                type="text"
                id="name"
                name="from_name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </motion.div>
            <motion.div variants={formItemVariants}>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-base">Email</Label>
              <Input
                type="email"
                id="email"
                name="from_email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </motion.div>
            <motion.div variants={formItemVariants}>
              <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300 text-base">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject of your inquiry"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </motion.div>
            <motion.div variants={formItemVariants}>
              <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 text-base">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </motion.div>
            <motion.div variants={formItemVariants}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 dark:from-blue-700 dark:to-indigo-800 dark:hover:from-blue-600 dark:hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2 h-5 w-5" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </>
                )}
              </Button>
              {submitMessage && (
                <p className={`mt-4 text-center font-medium ${submitMessage.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {submitMessage}
                </p>
              )}
            </motion.div>
          </motion.form>
        </motion.div>

        <motion.div
          key={`info-card-${isContactContentInView}`}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/30 dark:border-gray-700/50 transform transition-all duration-300"
          variants={cardVariants}
          custom={1}
          initial="hidden"
          animate={isContactContentInView ? "visible" : "hidden"}
          transition={{ delay: 0.2, ...cardVariants.visible.transition }}
          whileHover={{ scale: 1.02, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.98 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email Us</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1 text-lg">
                  For general inquiries or support:
                  <br />
                  <a href="mailto:anukrati240@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200">anukrati240@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Call Us</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1 text-lg">
                  Monday - Friday, 9 AM - 5 PM (EST)
                  <br />
                  <a href="tel:+1-800-123-4567" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200">+1 (800) 123-4567</a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Visit Our Office</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1 text-lg">
                  Legal Document Analyzer Inc.
                  <br />
                  123 AI Law Street, Suite 400
                  <br />
                  Legal City, LA 90210, USA
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.section
        ref={faqSectionRef}
        className="py-16 px-4 md:px-8 text-center bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 shadow-inner"
        initial="hidden"
        animate={isFaqSectionInView ? "visible" : "hidden"}
        variants={faqTextVariants}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Need Quick Answers?
        </h2>
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 mb-8"
          transition={{ delay: 0.2, ...faqTextVariants.visible.transition }}
        >
          Check out our frequently asked questions or visit our comprehensive support center.
        </motion.p>
        <motion.div
          className="flex justify-center gap-6 flex-wrap"
          variants={faqButtonsContainerVariants}
          initial="hidden"
          animate={isFaqSectionInView ? "visible" : "hidden"}
        >
          <motion.div variants={faqButtonItemVariants}>
            <Button
              asChild
              variant="outline"
              className="px-8 py-3 text-lg font-semibold text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300 rounded-full"
            >
              <a href="/#faq">Visit FAQs</a>
            </Button>
          </motion.div>
          <motion.div variants={faqButtonItemVariants}>
            <Button
              asChild
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 dark:from-blue-700 dark:to-indigo-800 dark:hover:from-blue-600 dark:hover:to-indigo-700 text-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link to="/support">Support Center</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Contact;