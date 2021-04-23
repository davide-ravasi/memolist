import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EdiText from "react-editext";

import { modifyCategory } from '../redux/categories/categories.actions';

const Categories = () => {
  const { listCategories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const roundbtnStyles =
    "flex justify-center items-center text-white text-sm rounded-full h-6 w-6 transition duration-500 ease-in-out";

  const editBtnStyles = `${roundbtnStyles} bg-gray-400 hover:bg-green-700`;

  const cancelBtnStyles = `${roundbtnStyles} bg-red-400 hover:bg-red-700 ml-1`;

  const saveBtnStyles = `${roundbtnStyles} bg-green-400 hover:bg-green-700`;

  const onSave = (idCat, newName) => {
    console.log("idCat ", idCat);
    console.log("Edited Value -> ", newName);
    dispatch(modifyCategory(idCat, newName));
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="mt-8 mx-4 font-md text-2xl">Manage your Categories</h1>
      <div className="mt-8 grid md:grid-cols-3 xs:grid-cols-1 gap-4 relative">
        {listCategories &&
          listCategories.map((cat) => {
            return (
              <div className="bg-white rounded-md p-3 shadow-xl relative">
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
                  onSave={(newName) => onSave(cat.id, newName)}
                  editOnViewClick={true}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;

// docs https://alioguzhan.github.io/react-editext/
