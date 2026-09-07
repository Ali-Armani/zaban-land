import React from 'react';
import { useAuth } from '../context/AuthContext';

// Reusable ad slot. Only rendered for non-Pro users. Drop in the real
// AdSense / Iranian-ad-network script tag where indicated - keep any
// client/publisher IDs in environment variables, never hardcoded here.
export default function AdBanner({ slot = 'default' }) {
  const { user } = useAuth();
  const isPro = user?.role === 'PRO' || user?.role === 'ADMIN';

  if (isPro) return null;

  return (
    <div
      data-ad-slot={slot}
      className="w-full bg-gray-100 border border-dashed border-gray-300 text-gray-400 text-xs flex items-center justify-center h-24 my-4 rounded"
    >
      {/* Insert Google AdSense <ins> tag or Iranian ad network embed here */}
      Advertisement
    </div>
  );
}
