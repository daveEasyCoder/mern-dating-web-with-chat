import React from 'react';
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { BiMessageRounded } from 'react-icons/bi'

const PersonCard = ({ person }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Profile Image Placeholder */}
      <div className="h-48 bg-gray-200 rounded-md relative mb-4 flex items-center justify-center">
        <FaHeart className="absolute top-2 right-2 text-red-500" />
        <span className="text-gray-400">Image</span>
      </div>

      {/* Details */}
      <h2 className="text-lg font-semibold">{person.name}, {person.age}</h2>
      <p className="text-sm text-gray-600">{person.job}</p>
      <div className="flex items-center text-gray-500 text-sm mt-1">
        <FiMapPin className="mr-1" /> {person.location}
      </div>

      {/* Interests */}
      <div className="flex flex-wrap gap-2 mt-3">
        {person.interests.slice(0, 3).map((interest, i) => (
          <span key={i} className="bg-gray-100 text-sm px-2 py-1 rounded">
            {interest}
          </span>
        ))}
        {person.interests.length > 3 && (
          <span className="bg-gray-200 text-sm px-2 py-1 rounded">+{person.interests.length - 3}</span>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-md text-sm font-medium">
          <FaRegHeart className="inline-block mr-2" />
          Interested
        </button>
        <button className="ml-2 bg-white border rounded-md p-2 hover:bg-gray-100">
          <BiMessageRounded />
        </button>
      </div>
    </div>
  );
};

export default PersonCard;
