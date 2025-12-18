import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { profile } = useSelector((state) => state.profileReducer);

  //handleModal function
  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <header className="text-white bg-pink-600 font-semibold body-font shadow-lg">
        <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
          <div>
            <a className="flex title-font font-medium items-center md:mb-0 ">
              <div className="ml-3 text-3xl italic">DineHub</div>
            </a>
          </div>
          <h3 className="ml-4">Category</h3>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap  items-center text-base justify-center">
            <Link className="mr-5" to="/">
              Home
            </Link>
            <Link className="mr-5">About</Link>
            <Link className="mr-5" to="/contact">
              {" "}
              Contact
            </Link>
            <Link className="mr-5">Profile</Link>
          </nav>
          {/* Navbar Button  */}

          <div className="mx-auto">
            <Link
              to="/cart"
              className="inline-flex items-center text-white bg-pink-600 border-1 py-1 px-3 focus:outline-none hover:bg-pink-500  md:mt-0"
            >
              Go to cart
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center text-white bg-pink-600 border-1 py-1 mx-2 px-3 focus:outline-none md:mt-0 hover:bg-pink-500"
            >
              Login
            </Link>

            <Link className="inline-flex ml-2 items-center text-white bg-pink-600  py-1 px-3 focus:outline-none hover:bg-pink-300 hover:rounded  md:mt-0">
              Language
            </Link>
          </div>
          <div className="flex items-center">
            <div className="mr-2 ml-6">
              <img
                className="w-8 h-8 rounded-full "
                src={profile.picture}
                alt=""
              />
            </div>
            <div className="cursor-pointer" onClick={handleModal}>
              {profile.name}
            </div>
            {showModal && <Modal closeModal={closeModal} profile={profile} />}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
