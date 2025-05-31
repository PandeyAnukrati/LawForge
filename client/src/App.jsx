// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import Generate from './pages/Generate';
import About from './pages/About';
import Contact from './pages/Contact';
import History from './pages/History';
import Getreport from './pages/Getreport';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'; 

// Import your custom Layout component (which includes Navbar and Footer)
import Layout from './components/Layout'; // <--- Ensure this path is correct
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/*
          1. ErrorPage Route (NO Navbar/Footer)
          This route should be placed FIRST and uses path="*".
          It will catch any undefined URL and render ONLY the ErrorPage component,
          as it is not nested within any layout that includes Navbar/Footer.
        */}
        <Route path="*" element={<ErrorPage statusCode={404} message="Page Not Found" />} />

        {/*
          2. Main Layout Route (WITH Navbar/Footer)
          All routes that *should* have the Navbar and Footer will be nested here.
          The <Layout /> component will render the Navbar, then an <Outlet /> for
          the child routes, and finally the Footer.
        */}
        <Route element={<Layout />}>
          {/* Public Routes - these will have Navbar and Footer */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes - these will also have Navbar and Footer,
              and additionally be protected by ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/history" element={<History />} />
            <Route path="/get-report" element={<Getreport />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;