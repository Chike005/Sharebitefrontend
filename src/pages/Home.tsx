import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHandsHelping, FaMapMarkerAlt, FaUtensils, FaUserCircle } from "react-icons/fa";

const Home: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = false; // Set to true if user is logged in
  const userName = "Chike"; // Replace with real user data when integrated

  const linkClass = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold underline"
      : "text-blue-600 hover:underline";

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Sticky Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShareBite
        </Link>

        <div className="space-x-4 flex items-center">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link
                to="/sign-up" 
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-blue-600 text-2xl" />
              <span className="font-medium text-blue-600">{userName}</span>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <motion.h1
          className="text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ShareBite
        </motion.h1>
        <motion.p
          className="text-lg max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Share surplus food and help those in need. Join our growing community of donors and recipients.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            to="/donations"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition"
          >
            Start Donating
          </Link>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <FaUtensils className="mx-auto text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Add Surplus Food</h3>
            <p className="mt-2 text-gray-600">List leftover food or items you want to donate.</p>
          </div>
          <div>
            <FaMapMarkerAlt className="mx-auto text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Pick Drop-off Location</h3>
            <p className="mt-2 text-gray-600">Choose a convenient drop-off site nearby.</p>
          </div>
          <div>
            <FaHandsHelping className="mx-auto text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Connect & Share</h3>
            <p className="mt-2 text-gray-600">Recipients reserve and collect the food with ease.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">2,000+</h3>
            <p className="text-gray-700 mt-2">Meals Shared</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">800+</h3>
            <p className="text-gray-700 mt-2">Users Joined</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">50+</h3>
            <p className="text-gray-700 mt-2">Drop-off Locations</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
