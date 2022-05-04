import React, { useState } from 'react';
import AddReview from '../modals/AddReview';

export default function Shops() {
  const [showReview, setShowReview] = useState(false);

  const displayReview = () => {
    setShowReview(true);
  }

  const hideReview = () => {
    setShowReview(false);
  }

  return (
    <div>
      <button onClick={displayReview} className="bg-red-300 hover:opacity-75 py-2 px-4 rounded text-white font-semibold">
        Rate Shop
      </button>
      <AddReview visible={showReview} onClose={hideReview}>

      </AddReview>
    </div>
  );
}
