import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchFlashcard } from '../redux/flashcard/flashcard.actions';

const FlashCards = () => {
  const stylesBtnAdd = `absolute right-0 top-3 flex justify-center items-center text-white 
    text-sm absolute right-2 rounded-full h-8 w-8 
    bg-green-600 hover:bg-green-800 transition duration-500 ease-in-out`;
  const roundbtnStyles = "flex justify-center items-center text-white text-sm rounded-full h-6 w-6 transition duration-500 ease-in-out";

  const user = (state) => state.user;
  const flashcards = (state) => state.flashcards;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(user);
  const { listFlashcards } = useSelector(flashcards)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.admLvl === true) {
      setIsAdmin(true);
      dispatch(fetchFlashcard());
    }
  }, [currentUser]);

  const onRemove = () => {

  }

  return (
    <div className="relative max-w-screen-lg mx-auto">
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

      {(listFlashcards && listFlashcards.length > 0) ? (
        <div className="mt-8 grid md:grid-cols-3 xs:grid-cols-1 gap-4 relative">
          {listFlashcards.map(card => {
            return <div className="bg-white rounded-md p-3 shadow-xl relative pr-10">
              <p>{card.question}</p>
              <button
                title="Remove this flashcard"
                className={`${roundbtnStyles} absolute top-3 right-2 bg-red-400 hover:bg-red-700 cursor-pointer`}
                onClick={() => onRemove()}
              >
                <FontAwesomeIcon icon="times" />
              </button>
            </div>
          })}
        </div>
      ) : '......loading'}
    </div>)
}

export default FlashCards;