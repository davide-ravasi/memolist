import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchFlashcard, removeFlashCard } from '../redux/flashcard/flashcard.actions';
import Modal from "../components/ModalPortal";
import ConfirmModal from "../components/ConfirmModal";
import FlashCardDetails from '../components/flashCardDetails';

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
  const [modalShow, setModalShow] = useState(false);
  const [elToRemove, setElToRemove] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.admLvl === true) {
      setIsAdmin(true);
      dispatch(fetchFlashcard());
    }
  }, [currentUser, dispatch]);

  const onCloseModal = () => {
    setModalShow(false);
    setElToRemove(null);
  }

  const onConfirmModal = () => {
    setModalShow(false);
    dispatch(removeFlashCard(elToRemove));
  };

  const onRemove = (item) => {
    setModalShow(true);
    setElToRemove(item);
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
            return <div className="bg-white rounded-md p-3 shadow-xl relative">
              <p className="pr-10">{card.question}</p>
              { isAdmin && <button
                title="Remove this flashcard"
                className={`${roundbtnStyles} absolute top-3 right-2 bg-red-400 hover:bg-red-700 cursor-pointer`}
                onClick={() => onRemove(card)}
              >
                <FontAwesomeIcon icon="times" />
              </button>}
              <FlashCardDetails description={card.description} link1={card.link1} />
            </div>
          })}
        </div>
      ) : '......loading'}

      <Modal>
        <ConfirmModal
          modalShow={modalShow}
          closeModal={onCloseModal}
          confirmModal={onConfirmModal}
        />
      </Modal>
    </div>)
}

export default FlashCards;