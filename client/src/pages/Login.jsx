import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Loader from '../components/Loader';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenAnimation = localStorage.getItem('loginAnimationShown');
    if (!hasSeenAnimation) {
      setShowAnimation(true);
      localStorage.setItem('loginAnimationShown', 'true');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate delay for testing (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      toast('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast(`❌ ${err.message}`);
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
          className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700"
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Sign in to continue analyzing your legal documents.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Create one
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
