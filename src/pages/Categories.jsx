import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EdiText from "react-editext";

const Categories = () => {
  const { listCategories } = useSelector((state) => state.categories);

  const roundbtnStyles =
    "flex justify-center items-center text-white text-sm rounded-full h-6 w-6 transition duration-500 ease-in-out bg-gray-400 hover:bg-green-700";

  const onSave = (val) => {
    console.log("Edited Value -> ", val);
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
                  editButtonContent={<FontAwesomeIcon icon="pen" />}
                  editButtonClassName={roundbtnStyles}
                  value={cat.name}
                  onSave={onSave}
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
