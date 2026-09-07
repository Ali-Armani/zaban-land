import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/lessons/${id}`)
      .then((res) => setLesson(res.data.lesson))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load lesson'));
  }, [id]);

  if (error) return <div className="max-w-2xl mx-auto p-8 text-red-500">{error}</div>;
  if (!lesson) return <div className="max-w-2xl mx-auto p-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-1">{lesson.title}</h2>
      <p className="text-gray-500 mb-6">{lesson.description}</p>

      <div className="space-y-3">
        {lesson.cards.map((card) => (
          <div key={card.id} className="bg-white shadow rounded p-4">
            <div className="font-semibold">{card.term}</div>
            <div className="text-sm text-gray-600">{card.definition}</div>
            {card.example && <div className="text-sm italic text-gray-400 mt-1">"{card.example}"</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
