import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Quiz from './pages/Quiz';
import Review from './pages/Review';
import Pricing from './pages/Pricing';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/review"
            element={<ProtectedRoute><Review /></ProtectedRoute>}
          />
          <Route
            path="/quizzes/:id"
            element={<ProtectedRoute><Quiz /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute role="ADMIN"><AdminPanel /></ProtectedRoute>}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
