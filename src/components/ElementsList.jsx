import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import FilterElements from "../outils/filterElements";

import ElementDetails from "./ElementDetails";
import SearchEngine from "./SearchEngine";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ElementsList = ({ onRemove, listItems, searchTerm }) => {
  const location = useLocation();
  const selectCats = (state) => state.categories;
  const { listCategories, activeCategory } = useSelector(selectCats);
  const selectUser = (state) => state.user;
  const { currentUser } = useSelector(selectUser);
  const wishlistEls = (state) => state.wishlist;
  const wishlist = useSelector(wishlistEls);
  const [isAdmin, setIsAdmin] = useState(false);
  let filteredEls = [];

  const stylesBtnAdd = `absolute right-4 top-5 flex justify-center items-center text-white 
    text-sm absolute right-2 rounded-full h-8 w-8 
    bg-green-600 hover:bg-green-800 transition duration-500 ease-in-out`;

  if (
    location.pathname === "/" ||
    (location.pathname === "/wishlist" && currentUser)
  ) {
    filteredEls = FilterElements(
      listItems,
      wishlist,
      location,
      activeCategory,
      searchTerm
    );
  }

  useEffect(() => {
    currentUser && currentUser.admLvl === true
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [currentUser]);

  return (
    <div className="relative">
      <div className="grid md:grid-cols-3 xs:grid-cols-1 gap-4 relative">
        <div className="mt-3">
          <h2 className="text-md ml-4">
            Filtered by: {activeCategory ? activeCategory : "All categories"}
          </h2>
          <p className="text-sm text-gray-600 ml-4">
            Total snippets: {filteredEls.length}
          </p>
        </div>

        <SearchEngine />
        {isAdmin && (
          <Link
            to="/element/add"
            className={stylesBtnAdd}
            title="Add a new snippet"
          >
            <FontAwesomeIcon icon={['fa','plus']} />
          </Link>
        )}
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 pt-4 pb-8 px-4 clear-both">
        {filteredEls.length ? (
          filteredEls.map((el) => (
            <ElementDetails
              key={el.id}
              itemDet={el}
              categories={listCategories}
              onRemove={onRemove}
              isAdmin={isAdmin}
              currentUser={currentUser}
              wishlist={wishlist}
            />
          ))
        ) : (
          <p className="text-center md:col-span-2 sm:col-span-1">
            Sorry, there are no snippets
          </p>
        )}
        {location.pathname === "/wishlist" && !currentUser && (
          <p className="text-center md:col-span-2 text-red-500 sm:col-span-1 font-bold">
            Only registered users can access the wishlist
          </p>
        )}
      </div>
    </div>
  );
};

export default ElementsList;
