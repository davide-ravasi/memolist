import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setActiveCategory } from "../redux/categories/categories.actions";

import ButtonIcon from "../components/ButtonIcon";
import CategoriesList from "./CategoriesList";
import Spinner from "./Spinner";

const CategoriesWrapper = () => {
  const { activeCategory } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const { listCategories } = useSelector((state) => state.categories);

  const removeFilter = () => {
    dispatch(setActiveCategory(""));
  };

  return (
    <>
      {listCategories.length ? (
        <CategoriesList
          listCategories={listCategories}
          activeCategory={activeCategory}
        />
      ) : (
        <Spinner bgColor={"text-black"} text={"loading categories"} />
      )}
      {activeCategory && (
        <div className="float-left md:ml-0 mt-2 md:mt-0">
          <ButtonIcon
            clickEvent={removeFilter}
            bgColor={"bg-red-500 hover:bg-red-700"}
            title="Remove filter"
          >
            <FontAwesomeIcon icon="times" />
          </ButtonIcon>
        </div>
      )}
    </>
  );
};

export default CategoriesWrapper;
