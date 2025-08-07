import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">LoveConnect</h1>
        <h2 className="text-xl font-semibold text-center mb-4">Login to your account</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border mt-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full border mt-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-pink-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
