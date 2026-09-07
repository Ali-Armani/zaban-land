import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`/quizzes/${id}`).then((res) => setQuiz(res.data.quiz));
  }, [id]);

  function selectAnswer(questionId, selectedIndex) {
    setAnswers((a) => ({ ...a, [questionId]: selectedIndex }));
  }

  async function submit() {
    const payload = {
      answers: Object.entries(answers).map(([questionId, selectedIndex]) => ({ questionId, selectedIndex })),
    };
    const { data } = await api.post(`/quizzes/${id}/submit`, payload);
    setResult(data.attempt);
  }

  if (!quiz) return <div className="max-w-2xl mx-auto p-8">Loading...</div>;
  if (result) {
    return (
      <div className="max-w-md mx-auto p-10 text-center">
        <h2 className="text-xl font-bold mb-2">Quiz complete!</h2>
        <p className="text-3xl font-bold text-brand">{result.score} / {result.total}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">{quiz.title}</h2>
      <div className="space-y-6">
        {quiz.questions.map((q) => (
          <div key={q.id} className="bg-white shadow rounded p-4">
            <p className="font-medium mb-3">{q.prompt}</p>
            <div className="space-y-2">
              {q.choices.map((choice, i) => (
                <label key={i} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === i}
                    onChange={() => selectAnswer(q.id, i)}
                  />
                  {choice}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={submit} className="mt-6 bg-brand text-white px-6 py-2 rounded">
        Submit quiz
      </button>
    </div>
  );
}
