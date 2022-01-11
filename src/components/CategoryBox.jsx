import React from "react";
import { useDispatch } from "react-redux";
import { setActiveCategory } from "../redux/categories/categories.actions";

const CategoryBox = ({ count, name, activeCategory }) => {
  const isActive = name === activeCategory;
  const classBox = `box-${name} ${
    isActive ? "bg-indigo-400" : "bg-gray-400"
  } w-1/2 mr-2 rounded-full mt-2 md:mt-1 inline-block py-0.5 px-3 text-white cursor-pointer hover:bg-indigo-400 transition duration-500 ease-in-out shadow-xl`;
  const dispatch = useDispatch();

  return (
    <button
      className={classBox}
      onClick={() => {
        dispatch(setActiveCategory(name));
      }}
      title={`Filter only ${name} snippets`}
    >
      {name}{" "}
      <span className="rounded-full bg-white text-xs h-3.5 w-3.5 ml-1 inline-block text-gray-400">
        {count}
      </span>
    </button>
  );
};

export default CategoryBox;
