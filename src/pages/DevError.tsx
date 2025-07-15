import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const PASSWORD = 'AbhiCritical2315';

const DevError = () => {
  const [input, setInput] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  if (!authenticated) {
    return (
      <>
        <a
          href="/"
          className="fixed top-6 right-6 z-50 bg-[#e60043] text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-[#b80036] transition"
        >
          Go to Home Page
        </a>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e9f1fa] via-[#c9e6fa] to-[#f8fafc]">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center gap-4 border border-gray-200">
            <h2 className="text-2xl font-bold text-goldenBronze mb-2">Hy Developer</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-goldenBronze"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" className="bg-goldenBronze text-white px-6 py-2 rounded shadow hover:bg-primaryBrown transition">Login</button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <a
        href="/"
        className="fixed top-6 right-6 z-50 bg-[#e60043] text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-[#b80036] transition"
      >
        Go to Home Page
      </a>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-[#e9f1fa] via-[#c9e6fa] to-[#f8fafc] p-4">
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl w-full bg-white rounded-xl shadow-lg p-8 md:mr-8 mb-8 md:mb-0 border border-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold text-goldenBronze mb-2">Abhishek Pandey</h1>
          <h2 className="text-lg md:text-xl text-primaryBrown mb-1">BTech CSE</h2>
          <h3 className="text-base md:text-lg text-cyan-900 mb-6">Full Stack Web Developer</h3>
          <div className="mb-6">
            <p className="text-base md:text-lg mb-2 font-semibold text-gray-900">
              Website developed by <span style={{ background: '#00fff7' }} className="px-1 rounded">Abhishek Pandey.</span>
            </p>
            <p className="text-sm md:text-base mb-2 text-gray-700">All content, design, and code on this site are original and crafted for Avro Sanitaryware.</p>
            <p className="text-sm md:text-base text-gray-700">For collaboration, feedback, or queries, contact:</p>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="w-5 h-5 text-goldenBronze" />
              <a href="mailto:greenjoy2315@gmail.com" className="text-goldenBronze font-medium underline hover:text-primaryBrown transition block">
                greenjoy2315@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400">&copy; {new Date().getFullYear()} Abhishek Pandey. All rights reserved.</div>
        </div>
        <div className="w-full max-w-2xl h-[85vh] overflow-y-auto overflow-x-hidden rounded-xl border-2 border-goldenBronze bg-white shadow-lg p-2">
          <img
            src={'/images/screenshort.png'}
            alt="Website Screenshot Placeholder"
            className="w-full object-contain object-top"
            style={{ maxHeight: 'none' }}
          />
        </div>
      </div>
    </>
  );
};

export default DevError; 