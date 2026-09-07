import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FlashCard from '../components/FlashCard';

export default function Review() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    api.get('/review/due').then((res) => setCards(res.data.cards));
  }, []);

  async function handleAnswer(correct) {
    const current = cards[index];
    await api.post('/review/submit', { cardId: current.cardId, correct });
    if (index + 1 < cards.length) {
      setIndex(index + 1);
    } else {
      setDone(true);
    }
  }

  if (cards.length === 0 && !done) {
    return <div className="max-w-md mx-auto p-10 text-center text-gray-500">No cards due for review right now. Nice work!</div>;
  }
  if (done) {
    return <div className="max-w-md mx-auto p-10 text-center text-green-600 font-semibold">Review session complete!</div>;
  }

  const current = cards[index];
  return (
    <div className="py-10">
      <p className="text-center text-sm text-gray-400 mb-4">{index + 1} / {cards.length}</p>
      <FlashCard card={current.card} onAnswer={handleAnswer} />
    </div>
  );
}
