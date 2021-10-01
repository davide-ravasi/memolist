import React from 'react';
// import { useSelector } from 'react-redux';

import { addFlashCard } from '../redux/flashcard/flashcard.actions';

import FlashCardForm from './FlashCardForm';

const FlashCardAdd = () => {
    // const {currentUser} = useSelector(state => state.user);

    return <div className="max-w-screen-lg mx-auto pt-5 px-4"> 
        {/* <FlashCardForm action={ addElement } userName={currentUser ? currentUser.name : ''} /> */}
        <FlashCardForm action={addFlashCard} />
    </div>
}

export default FlashCardAdd;