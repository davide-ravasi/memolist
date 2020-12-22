import React from "react";
import { Link } from 'react-router-dom';
import { faThList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ user, signIn, signOut }) => {
  const menuItemsCss =
    "px-6 py-1 text-white font-medium text-base hover:bg-gray-600 rounded-md";

  return (
    <div className="containe bg-gray-800 shadow-md">
      <div className="mx-auto max-w-screen-lg flex h-16 flex items-center justify-between h-16">
        <div>
          <Link to="/" className="logo px-2 text-white text-xl mt-6 text-indigo-300">
            <FontAwesomeIcon icon={faThList} />
          </Link>
          <Link to="/" className={menuItemsCss}>
            Home
          </Link>
          <a href="#" className={menuItemsCss}>
            All Lists
          </a>
          <a href="#" className={menuItemsCss}>
            Categories
          </a>
        </div>

        {!user && (
          <div>
            <span className={menuItemsCss}>You're not connected</span>
            <a href="#" className={menuItemsCss} onClick={signIn}>
              Login
            </a>
          </div>
        )}
        {user && (
          <div>
            <span className="px-6 py-1 text-white font-medium text-base text-indigo-300">
              <FontAwesomeIcon className="mr-2" icon={faUser} />
              {user.displayName}
            </span>
            <a href="#" className={menuItemsCss} onClick={signOut}>
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
