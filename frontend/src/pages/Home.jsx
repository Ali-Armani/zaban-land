import React from 'react';
import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      <h1 className="text-4xl font-bold text-brand mb-4">Welcome to Zaban Land</h1>
      <p className="text-gray-600 mb-8">
        A fun, structured way for kids and teens to learn English - from complete
        beginner to advanced, with smart review powered by spaced repetition.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/lessons" className="bg-brand text-white px-6 py-3 rounded-lg">
          Browse Lessons
        </Link>
        <Link to="/register" className="border border-brand text-brand px-6 py-3 rounded-lg">
          Create Account
        </Link>
      </div>
      <AdBanner slot="home-bottom" />
    </div>
  );
}
