import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Hero Section */}
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-green-600">Welcome to ShareBite</h1>
        <p className="text-lg text-gray-700 mt-4">
          Share surplus food and help those in need. Join our community today!
        </p>
        <Link
          to="/donations"
          className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-lg text-lg"
        >
          Start Donating
        </Link>
      </div>
    </div>
  );
};

export default Home;
