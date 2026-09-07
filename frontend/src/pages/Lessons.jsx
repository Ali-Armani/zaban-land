import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AdBanner from '../components/AdBanner';

const LEVELS = ['BEGINNER', 'ELEMENTARY', 'INTERMEDIATE', 'UPPER_INTERMEDIATE', 'ADVANCED'];

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [level, setLevel] = useState('');

  useEffect(() => {
    api.get('/lessons', { params: level ? { level } : {} }).then((res) => setLessons(res.data.lessons));
  }, [level]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => setLevel('')} className={`px-3 py-1 rounded border ${!level ? 'bg-brand text-white' : ''}`}>All</button>
        {LEVELS.map((l) => (
          <button key={l} onClick={() => setLevel(l)} className={`px-3 py-1 rounded border ${level === l ? 'bg-brand text-white' : ''}`}>
            {l.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={lesson.locked ? '/pricing' : `/lessons/${lesson.id}`}
            className="block bg-white shadow rounded p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{lesson.title}</div>
                <div className="text-sm text-gray-500">{lesson.level.replace('_', ' ')}</div>
              </div>
              {lesson.locked && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Pro</span>}
            </div>
          </Link>
        ))}
      </div>

      <AdBanner slot="lessons-list" />
    </div>
  );
}
