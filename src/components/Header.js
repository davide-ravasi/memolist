import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { faThList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ signIn, signOut }) => {
  const {currentUser} = useSelector(state => state.user);
  const menuItemsCss =
    "px-6 py-1 text-white font-medium text-base hover:bg-gray-600 rounded-md";

  return (
    <div className="containe bg-gray-800 shadow-md">
      <div className="mx-auto max-w-screen-lg flex h-16 flex items-center justify-between h-16">
        <div className="min-h-full flex items-center justify-between">
          <Link to="/" className="logo px-2 text-white text-xl text-indigo-300">
            <FontAwesomeIcon icon={faThList} />
          </Link>
          <Link to="/" className={menuItemsCss}>
            Home
          </Link>
          {/* <a href="#" className={menuItemsCss}>
            All Lists
          </a> */}
          <a href="#" className={menuItemsCss}>
            Categories
          </a>
          <Link to="/connection" className={menuItemsCss}>
            Admin
          </Link>
        </div>

        {!currentUser && (
          <div className="min-h-full flex items-center justify-between">
            <span className={menuItemsCss}>You're not connected</span>
            <a href="#" className={menuItemsCss} onClick={signIn}>
              Login with Google
            </a>
          </div>
        )}
        {currentUser && (
          <div className="min-h-full flex items-center justify-between">
            <span className="px-6 py-1 text-white font-medium text-base text-indigo-300">
              {currentUser.photoUrl ?
                  <> 
                  <FontAwesomeIcon className="mr-2" icon={faUser} /> 
                  {currentUser.name}
                  </>
                :
                  <span class="relative w-8 h-8 inline-block">
                    <img class="rounded-full border border-gray-100 shadow-sm" src={currentUser.photo} alt="user image" />
                    <span class="absolute -top-1 -right-1 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></span>
                    <span className="absolute -bottom-1 -left-1">{currentUser.name}</span>
                  </span>
              }
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
