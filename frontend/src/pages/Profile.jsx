import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="bg-white shadow rounded p-4 space-y-2 text-sm">
        <p><span className="text-gray-500">Username:</span> {user.username}</p>
        <p><span className="text-gray-500">Role:</span> {user.role}</p>
        {user.email && <p><span className="text-gray-500">Email:</span> {user.email}</p>}
        {user.mobile && <p><span className="text-gray-500">Mobile:</span> {user.mobile}</p>}
      </div>
    </div>
  );
}
