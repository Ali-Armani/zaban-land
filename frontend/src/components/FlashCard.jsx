import React, { useState } from 'react';

export default function FlashCard({ card, onAnswer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 text-center">
      <div className="text-2xl font-semibold mb-4">{card.term}</div>
      {flipped && (
        <div className="text-gray-600 mb-4">
          <p>{card.definition}</p>
          {card.example && <p className="italic text-sm mt-2">"{card.example}"</p>}
        </div>
      )}
      {!flipped ? (
        <button
          onClick={() => setFlipped(true)}
          className="bg-brand text-white px-4 py-2 rounded"
        >
          Show answer
        </button>
      ) : (
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onAnswer(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            I didn't know it
          </button>
          <button
            onClick={() => onAnswer(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            I knew it
          </button>
        </div>
      )}
    </div>
  );
}
