import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useSelector((state) => state.profileReducer);

  //handleModal function
  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <header className="text-white bg-pink-600 font-semibold body-font shadow-lg">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <span className="text-2xl sm:text-3xl italic">DineHub</span>
            </Link>
            <span className="hidden sm:block text-sm sm:text-base">Category</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav
            className={`w-full md:w-auto flex-col md:flex-row md:flex items-start md:items-center text-base gap-3 md:gap-6 ${
              isOpen ? "flex" : "hidden"
            }`}
          >
            <Link className="w-full md:w-auto" to="/">
              Home
            </Link>
            <Link className="w-full md:w-auto">About</Link>
            <Link className="w-full md:w-auto" to="/contact">
              Contact
            </Link>
            <Link className="w-full md:w-auto">Profile</Link>
          </nav>

          {/* Navbar Button  */}
          <div className="w-full md:w-auto flex flex-wrap items-center gap-2 justify-start md:justify-end">
            <Link
              to="/cart"
              className="inline-flex items-center text-white bg-pink-600 border border-white/20 py-2 px-3 rounded hover:bg-pink-500 transition"
            >
              Go to cart
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center text-white bg-pink-600 border border-white/20 py-2 px-3 rounded hover:bg-pink-500 transition"
            >
              Login
            </Link>
            <button className="inline-flex items-center text-white bg-pink-600 border border-white/20 py-2 px-3 rounded hover:bg-pink-500 transition">
              Language
            </button>
          </div>

          <div className="flex items-center gap-3">
            <img className="w-8 h-8 rounded-full object-cover" src={profile.picture} alt="profile" />
            <button className="cursor-pointer" onClick={handleModal}>
              {profile.name}
            </button>
            {showModal && <Modal closeModal={closeModal} profile={profile} />}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
