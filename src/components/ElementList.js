import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { removeElement } from '../redux/list/list.actions';
import { fetchList } from '../redux/list/list.actions';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from './ModalPortal';
import ConfirmModal from './ConfirmModal';
import CategoryList from "./CategoryList";
import ElementDetails from "./ElementDetails";

const ElementList = (props) => {
  const selectEls = state => state.list;
  const {listItems} = useSelector(selectEls);
  const selectCats = state => state.categories;
  const {listCategories, activeCategory} = useSelector(selectCats);
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [idElToRemove, setIdElToRemove] = useState('');

  const stylesBtnAdd = `flex justify-center items-center text-white 
                        text-sm absolute right-2 rounded-full h-8 w-8 
                        bg-green-600 hover:bg-green-800 transition duration-500 ease-in-out`;

  const filteredEls = activeCategory ? listItems.filter(el => el.category === activeCategory) : listItems

  const onRemove = (id) => {
    setModalShow(true);
    setIdElToRemove(id);
  }

  const onCloseModal = () => {
    setModalShow(false);
    setIdElToRemove('');
  }

  const onConfirmModal = () => {
    setModalShow(false);
    dispatch(removeElement(idElToRemove));
    console.log('dispatch remove action with id: ', idElToRemove);
  }

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <>
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-4 gap-4 my-8 relative">
        <CategoryList />
        <Link to='/element/add' className={stylesBtnAdd}>
                <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 py-8">
        { listItems.length ?
          filteredEls.map(el => <ElementDetails {...el} categories={listCategories} onRemove={onRemove} />)
          :
          <div>Loading...</div>
        }
      </div>
    </div>
    <Modal>
      <ConfirmModal modalShow={modalShow} closeModal={onCloseModal} confirmModal={onConfirmModal} />
    </Modal>
    </>
  );
};

export default ElementList;
