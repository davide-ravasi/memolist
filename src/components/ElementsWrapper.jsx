import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeElement } from '../redux/list/list.actions';

import Modal from './ModalPortal';
import ConfirmModal from './ConfirmModal';
import ElementsList from './ElementsList';
import Spinner from './Spinner';

const ElementsWrapper = () => {
    const [modalShow, setModalShow] = useState(false);
    const [idElToRemove, setIdElToRemove] = useState('');

    const selectEls = state => state.list;
    const {listItems} = useSelector(selectEls);

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

    return (
    <>
        {listItems.length ? 
            <ElementsList onRemove={onRemove} listItems={listItems} /> :
            <Spinner bgColor={'text-black'} text={'loading elements list'} />
        }
        <Modal>
            <ConfirmModal modalShow={modalShow} closeModal={onCloseModal} confirmModal={onConfirmModal} />
        </Modal>
    </>  
)}

export default ElementsWrapper;