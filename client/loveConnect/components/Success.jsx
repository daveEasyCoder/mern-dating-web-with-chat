import React, { useState } from 'react';
import TestimonialModal from './ShareStories';

const testimonials = [
  {
    name: 'Jennifer & Mark',
    message:
      'We met on LoveConnect 2 years ago and got married last month! Thank you for bringing us together.',
  },
  {
    name: 'Sarah',
    message:
      'Amazing platform! I found my soulmate here. The matching system really works!',
  },
  {
    name: 'Mike & Lisa',
    message:
      'LoveConnect helped us find each other when we least expected it. Now we’re planning our future together!',
  },
];

const StarRating = () => (
  <div className="flex justify-center mb-5">
    {Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.382 2.457a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.538 1.118l-3.382-2.457a1 1 0 00-1.176 0l-3.382 2.457c-.783.57-1.838-.197-1.538-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
  </div>
);

const TestimonialCard = ({ name, message }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm mx-auto">
    <StarRating />
    <p className="text-gray-600 italic mb-4 text-sm">"{message}"</p>
    <div className="font-semibold text-gray-700 text-sm">{name}</div>
  </div>
);

const SuccessStories = () => {

  const [isOpen,setIsOpen] = useState(false)
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
          <p className="text-gray-600 mt-2">
            Real couples, real love stories
          </p>
          <button onClick={() => setIsOpen(true)} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition">
            💖 Share Your Story
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} name={t.name} message={t.message} />
          ))}
        </div>
      </div>
       <TestimonialModal isOpen={isOpen} setIsOpen = {setIsOpen} />
    </section>
  );
};

export default SuccessStories;
