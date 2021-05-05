import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EdiText from "react-editext";

import {
  modifyCategory,
  removeCategory,
} from "../redux/categories/categories.actions";

import CategoryForm from "../components/CategoryAdd";

const Categories = () => {
  const { listCategories } = useSelector((state) => state.categories);
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();

  const roundbtnStyles =
    "flex justify-center items-center text-white text-sm rounded-full h-6 w-6 transition duration-500 ease-in-out";

  const stylesBtnAdd = `absolute right-0 top-3 flex justify-center items-center text-white 
    text-sm absolute right-2 rounded-full h-8 w-8 
    bg-green-600 hover:bg-green-800 transition duration-500 ease-in-out`;

  const editBtnStyles = `${roundbtnStyles} bg-gray-400 hover:bg-green-700`;

  const cancelBtnStyles = `${roundbtnStyles} bg-red-400 hover:bg-red-700 ml-1`;

  const saveBtnStyles = `${roundbtnStyles} bg-green-400 hover:bg-green-700`;

  const onSave = (idCat, oldName, newName) => {
    dispatch(modifyCategory(idCat, oldName, newName));
  };

  const onRemove = (idCat, name) => {
    dispatch(removeCategory(idCat, name));
  };

  const onClick = () => {
    setShowAddForm(true);
  };

  return (
    <div className="max-w-screen-lg mx-auto relative">
      <h1 className="mt-8 mx-4 font-md text-2xl">Manage your Categories</h1>
      <button
        type="button"
        className={stylesBtnAdd}
        title="Add a new category"
        onClick={onClick}
      >
        <FontAwesomeIcon icon="plus" />
      </button>
      {showAddForm && (
        <div className="bg-gray-300 border shadow-xl rounded-md my-5 py-4">
          <CategoryForm />
        </div>
      )}
      <div className="mt-8 grid md:grid-cols-3 xs:grid-cols-1 gap-4 relative">
        {listCategories &&
          listCategories.map((cat) => {
            return (
              <div className="bg-white rounded-md p-3 shadow-xl relative pr-10">
                <EdiText
                  type="text"
                  viewProps={{
                    className: "block w-full",
                  }}
                  submitOnEnter
                  cancelOnEscape
                  saveButtonContent={<FontAwesomeIcon icon="check" />}
                  saveButtonClassName={saveBtnStyles}
                  cancelButtonContent={<FontAwesomeIcon icon="times" />}
                  cancelButtonClassName={cancelBtnStyles}
                  editButtonContent={<FontAwesomeIcon icon="pen" />}
                  editButtonClassName={editBtnStyles}
                  value={cat.name}
                  onSave={(newName) => onSave(cat.id, cat.name, newName)}
                  editOnViewClick={true}
                />
                <button
                  title="Remove this category"
                  className={`${roundbtnStyles} absolute top-3 right-2 bg-red-400 hover:bg-red-700 cursor-pointer`}
                  onClick={() => onRemove(cat.id, cat.name)}
                >
                  <FontAwesomeIcon icon="times" />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;

// docs https://alioguzhan.github.io/react-editext/
