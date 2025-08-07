import React, { useState } from 'react';

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    height: '',
    skinColor: '',
    job: '',
    hobbies: '',
    bio: '',
    location: '',
    profilePicture: '',
    lookingFor: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add API call here
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">💖 Create Your LoveConnect Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

   

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Height (e.g., 5.7)</label>
            <input
              type="text"
              name="height"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Skin Color</label>
            <input
              type="text"
              name="skinColor"
              placeholder="Fair, Medium, Dark"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className='md:col-span-2'>
            <label className="block text-sm font-medium text-gray-700">Job</label>
            <input
              type="text"
              name="job"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Interests (comma-separated)</label>
            <input
              type="text"
              name="hobbies"
              placeholder="e.g., Photography, Hiking"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              rows="4"
              placeholder="Tell us about yourself..."
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Looking For</label>
            <select
              name="lookingFor"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">Select</option>
              <option value="Friendship">Friendship</option>
              <option value="Dating">Dating</option>
              <option value="Marriage">Marriage</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
            <input
              type="text"
              name="profilePicture"
              placeholder="https://example.com/photo.jpg"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          ❤️ Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
