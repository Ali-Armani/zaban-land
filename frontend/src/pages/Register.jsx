import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

export default function Register() {
  const [form, setForm] = useState({
    username: '', email: '', mobile: '', password: '', dateOfBirth: '', parentalConsent: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Create account</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-3">Account created! Redirecting to login...</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Username"
          value={form.username} onChange={(e) => update('username', e.target.value)} required />
        <input className="w-full border rounded px-3 py-2" placeholder="Email (optional if mobile given)"
          type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Mobile (optional if email given)"
          value={form.mobile} onChange={(e) => update('mobile', e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Password (min 8 chars)"
          type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required />
        <label className="block text-sm text-gray-600">
          Date of birth
          <input className="w-full border rounded px-3 py-2 mt-1" type="date"
            value={form.dateOfBirth} onChange={(e) => update('dateOfBirth', e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" checked={form.parentalConsent}
            onChange={(e) => update('parentalConsent', e.target.checked)} />
          A parent/guardian consents to this account (required if under 18)
        </label>
        <button className="w-full bg-brand text-white py-2 rounded">Sign up</button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        Already have an account? <Link to="/login" className="text-brand">Log in</Link>
      </p>
    </div>
  );
}
