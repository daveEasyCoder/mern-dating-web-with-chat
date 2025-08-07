import React, { useState } from 'react';

const TestimonialModal = ({ isOpen,setIsOpen }) => {
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [rating, setRating] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, story, rating });
    // onClose();
    setName('');
    setStory('');
    setRating(5);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
         onClick={() => setIsOpen(false)}
          className="absolute top-3 right-4 text-gray-500 cursor-pointer hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Share Your Success Story</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              placeholder="e.g., John & Jane"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Your Story</label>
            <textarea
              placeholder="Tell us about your LoveConnect experience..."
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="4"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label className="block mb-1 font-medium">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
            
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Submit Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialModal;
