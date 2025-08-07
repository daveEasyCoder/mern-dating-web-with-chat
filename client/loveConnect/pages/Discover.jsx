import React from 'react';
import PersonCard from '../components/PersonCard';
import Navbar from '../components/Navbar';


const people = [
  {
    name: 'Sarah Johnson',
    age: 28,
    job: 'Graphic Designer',
    location: 'New York, NY',
    interests: ['Photography', 'Hiking', 'Cooking'],
  },
  {
    name: 'Michael Chen',
    age: 32,
    job: 'Software Engineer',
    location: 'San Francisco, CA',
    interests: ['Fitness', 'Reading', 'Music'],
  },
  {
    name: 'Emma Rodriguez',
    age: 26,
    job: 'Marketing Manager',
    location: 'Los Angeles, CA',
    interests: ['Dancing', 'Art', 'Yoga'],
  },
];

const Discover = () => {
  return (
    <div className="px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discover People</h1>
        <button className="border px-4 py-2 rounded-md hover:bg-gray-100">
          <span className="mr-2">🔍</span> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person, index) => (
          <PersonCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
