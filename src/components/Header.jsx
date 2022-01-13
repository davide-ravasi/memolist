import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ signIn, signOut }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuItemsCss =
    "px-6 py-1 text-white font-medium text-base hover:bg-gray-600 rounded-md";

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="containe bg-gray-800 shadow-md">
      <div className="relative mx-auto max-w-screen-lg flex h-16 flex items-center justify-between h-16 z-10">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            onClick={() => toggleMenu()}
            className="
                inline-flex items-center justify-center 
                p-2 rounded-md text-gray-400 hover:text-white 
                hover:bg-gray-700 focus:outline-none focus:ring-2 
                focus:ring-inset focus:ring-white ml-4"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          className={`
                bg-gray-800 shadow-md w-full 
                flex-grow lg:flex lg:items-center lg:w-auto 
                ${!isMenuVisible && "hidden"} 
                lg:block pt-0 md:pt-6 mt-32 md:mt-0 lg:pt-0`}
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-start flex-1 items-center pt-10 md:pt-0">
            <li class="mr-3 my-2 md:my-0">
              <NavLink to="/" className={menuItemsCss} exact={true}>
                Home
              </NavLink>
            </li>
            <li class="mr-3 my-2 md:my-0">
              <NavLink to="/flashcards" className={menuItemsCss}>
                FlashCards
              </NavLink>
            </li>
            {currentUser && (
              <>
                <li class="mr-3 my-2 md:my-0">
                  <NavLink to="/wishlist" className={menuItemsCss}>
                    My Wishlist
                  </NavLink>
                </li>
                <li class="mr-3 my-2 md:my-0">
                <NavLink to="/categories" className={menuItemsCss}>
                  Categories
                </NavLink>
              </li>
              </>
            )}
            <li className="mr-3 my-2 md:my-0">
              <NavLink to="/connection" className={menuItemsCss}>
                Admin
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {!currentUser && (
            <div className="min-h-full flex items-center justify-between">
              <span className={menuItemsCss}>Not connected</span>
              <button type="button" className={menuItemsCss} onClick={signIn}>
                Google Login
              </button>
            </div>
          )}
          {currentUser && (
            <div className="min-h-full flex items-center justify-between">
              <span className="relative px-6 py-1 text-white font-medium text-base text-indigo-300">
                {currentUser.photoUrl ? (
                  <>
                    <FontAwesomeIcon className="mr-2" icon="user" />
                    {currentUser.name}
                  </>
                ) : (
                  <>
                    <span class="relative w-8 h-8 inline-block">
                      <img
                        class="rounded-full border border-gray-100 shadow-sm -mt-1"
                        src={currentUser.photo}
                        alt="user thumbnail"
                      />
                      <span class="absolute -top-1 -right-1 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 text-xs leading-none text-center">
                      {currentUser.name}
                    </span>
                  </>
                )}
              </span>
              <button type="button" className={menuItemsCss} onClick={signOut}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
