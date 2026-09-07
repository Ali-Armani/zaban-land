import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpgrade() {
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/subscription/checkout');
      window.location.href = data.redirectUrl; // redirect to payment gateway
    } catch (err) {
      setError(err.response?.data?.error || 'Could not start checkout');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-2">Zaban Land Pro</h2>
      <p className="text-gray-500 mb-6">Unlock advanced lessons, ad-free learning, and more.</p>

      <div className="bg-white shadow rounded-lg p-6">
        <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
          <li>✔ All beginner to advanced lessons</li>
          <li>✔ No advertisements</li>
          <li>✔ Unlimited spaced-repetition review</li>
        </ul>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {user?.role === 'PRO' || user?.role === 'ADMIN' ? (
          <p className="text-green-600 font-semibold">You already have Pro access!</p>
        ) : (
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-brand text-white py-2 rounded"
          >
            {loading ? 'Redirecting to payment...' : 'Upgrade to Pro'}
          </button>
        )}
      </div>
    </div>
  );
}
