import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FlashCards = () => {
  const stylesBtnAdd = `absolute right-4 top-5 flex justify-center items-center text-white 
  text-sm absolute right-2 rounded-full h-8 w-8 
  bg-green-600 hover:bg-green-800 transition duration-500 ease-in-out`;
  const user = (state) => state.user;
  const { currentUser } = useSelector(user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.admLvl === true) {
      setIsAdmin(true);
    }
  }, [currentUser]);

  return (<div className="relative max-w-screen-lg mx-auto">
    <h1 className="mt-8 mx-4 font-md text-2xl">Flashcards list</h1>
    {isAdmin && (
      <Link
        to="/flashcards/add"
        className={stylesBtnAdd}
        title="Add a new snippet"
      >
        <FontAwesomeIcon icon="plus" />
      </Link>
    )}


    <ul>
      <li>flashcard 1</li>
      <li>flashcard 2</li>
      <li>flashcard 3</li>
    </ul>
  </div>)
}

export default FlashCards;