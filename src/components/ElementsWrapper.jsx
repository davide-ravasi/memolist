import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeElement } from '../redux/list/list.actions';

import Modal from './ModalPortal';
import ConfirmModal from './ConfirmModal';
import ElementsList from './ElementsList';
import WithSpinner from './WithSpinner';

const ElementsWrapper = () => {
    const [modalShow, setModalShow] = useState(false);
    const [idElToRemove, setIdElToRemove] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const selectEls = state => state.list;
    const {listItems} = useSelector(selectEls);

    const ElementsListWithSpinner = WithSpinner(ElementsList);

    const dispatch = useDispatch();

    const onCloseModal = () => {
        setModalShow(false);
        setIdElToRemove('');
    }
    
    const onConfirmModal = () => {
        setModalShow(false);
        dispatch(removeElement(idElToRemove));
    }

    const onRemove = (id) => {
        setModalShow(true);
        setIdElToRemove(id);
    }

    useEffect(() => {
        if(listItems.length) {
            setIsLoading(false);
        }
    },[listItems]);

    return (
    <>
        <ElementsListWithSpinner  isLoading={isLoading} bgColor={'text-black'} text={'loading list'} onRemove={onRemove} listItems={listItems} />
        <Modal>
            <ConfirmModal modalShow={modalShow} closeModal={onCloseModal} confirmModal={onConfirmModal} />
        </Modal>
    </>  
)}

export default ElementsWrapper;