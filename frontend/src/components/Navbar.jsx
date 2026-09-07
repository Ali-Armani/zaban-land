import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <nav className="bg-brand text-white px-4 py-3 flex items-center justify-between shadow">
      <Link to="/" className="font-bold text-xl">Zaban Land</Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/lessons">Lessons</Link>
        <Link to="/review">Review</Link>
        <Link to="/pricing">Pro</Link>
        {user?.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="bg-brand-dark px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-brand-dark px-3 py-1 rounded">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
