import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminPanel() {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/admin/analytics').then((res) => setAnalytics(res.data));
    api.get('/admin/users').then((res) => setUsers(res.data.users));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      {analytics && (
        <div className="grid grid-cols-4 gap-4 mb-8">
          {Object.entries(analytics).map(([key, value]) => (
            <div key={key} className="bg-white shadow rounded p-4 text-center">
              <div className="text-2xl font-bold text-brand">{value}</div>
              <div className="text-xs text-gray-500">{key}</div>
            </div>
          ))}
        </div>
      )}

      <h3 className="font-semibold mb-2">Users</h3>
      <table className="w-full bg-white shadow rounded text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Username</th>
            <th className="p-2">Role</th>
            <th className="p-2">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b last:border-0">
              <td className="p-2">{u.username}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
