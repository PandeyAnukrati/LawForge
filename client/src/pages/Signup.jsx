import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Mail, Lock, User } from 'lucide-react';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Loader from '../components/Loader';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const hasSeenSignupAnimation = localStorage.getItem('signupAnimationShown');
    if (!hasSeenSignupAnimation) {
      setShowAnimation(true);
      localStorage.setItem('signupAnimationShown', 'true');
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // simulate a 2-second delay for testing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await axios.post('http://localhost:3000/api/auth/register', {
        username: form.name,
        email: form.email,
        password: form.password,
      });

      const { user, token } = res.data;
      login(user, token);
      toast('✅ Account created successfully!');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      toast(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const Container = showAnimation ? motion.div : 'div';

  return (
    <>
      {loading && <Loader />}

      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-950 dark:to-indigo-900 flex items-center justify-center px-4">
        <Container
          className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200 dark:border-gray-700"
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Create Account
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Join Legal Document Analyzer to streamline your legal workflow.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Log in
            </Link>
          </p>
        </Container>
      </div>
    </>
  );
};

export default Signup;
