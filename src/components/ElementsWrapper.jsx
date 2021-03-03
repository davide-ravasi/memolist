import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeElement } from "../redux/list/list.actions";

import Modal from "./ModalPortal";
import ConfirmModal from "./ConfirmModal";
import ElementsList from "./ElementsList";
import Spinner from "./Spinner";

const ElementsWrapper = () => {
  const [modalShow, setModalShow] = useState(false);
  const [elToRemove, setElToRemove] = useState();

  const selectEls = (state) => state.list;
  const { listItems, searchTerm } = useSelector(selectEls);

  const dispatch = useDispatch();

  const onCloseModal = () => {
    setModalShow(false);
    setElToRemove();
  };

  const onConfirmModal = () => {
    setModalShow(false);
    dispatch(removeElement(elToRemove));
  };

  const onRemove = (item) => {
    setModalShow(true);
    setElToRemove(item);
  };

  return (
    <>
      {listItems.length ? (
        <ElementsList
          onRemove={onRemove}
          listItems={listItems}
          searchTerm={searchTerm}
        />
      ) : (
        <Spinner bgColor={"text-black"} text={"loading elements list"} />
      )}

      <Modal>
        <ConfirmModal
          modalShow={modalShow}
          closeModal={onCloseModal}
          confirmModal={onConfirmModal}
        />
      </Modal>
    </>
  );
};

export default ElementsWrapper;
