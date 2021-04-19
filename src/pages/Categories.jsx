import React from "react";
import { useSelector } from "react-redux";

const Categories = () => {
  const { listCategories } = useSelector((state) => state.categories);

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="mt-8 mx-4 font-md text-2xl">Manage your Categories</h1>
      <div className="mt-8 grid md:grid-cols-3 xs:grid-cols-1 gap-4 relative">
        {listCategories &&
          listCategories.map((cat) => {
            return (
              <div className="bg-white rounded-md p-3 shadow-xl relative">
                {cat.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
