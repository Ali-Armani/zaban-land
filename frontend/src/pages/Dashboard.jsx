import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/users/dashboard').then((res) => setData(res.data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.username}!</h2>
      <p className="text-gray-500 mb-6">
        Role: {user?.role}{user?.role === 'USER' && (
          <> — <Link to="/pricing" className="text-brand underline">upgrade to Pro</Link></>
        )}
      </p>

      {data && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-3xl font-bold text-brand">{data.dueForReview}</div>
            <div className="text-sm text-gray-500">Cards due for review</div>
          </div>
          <Link to="/review" className="bg-brand text-white rounded-lg shadow p-4 flex items-center justify-center">
            Start reviewing
          </Link>
        </div>
      )}

      {data?.recentQuizAttempts?.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Recent quiz results</h3>
          <ul className="space-y-2">
            {data.recentQuizAttempts.map((a) => (
              <li key={a.id} className="bg-white shadow rounded p-3 flex justify-between text-sm">
                <span>{a.quiz?.title}</span>
                <span>{a.score}/{a.total}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
