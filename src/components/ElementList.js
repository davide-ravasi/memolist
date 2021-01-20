import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import ElementDetails from "./ElementDetails";
import { useSelector, useDispatch } from 'react-redux';
import { fetchList } from '../actions/';
import CategoryList from "./CategoryList";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ElementList = (props) => {
  const selectEls = state => state.list;
  const elements = useSelector(selectEls);
  const selectCats = state => state.categories;
  const {listCategories, activeCategory} = useSelector(selectCats);
  const dispatch = useDispatch();
  const stylesBtnAdd = `flex justify-center items-center text-white 
                        text-sm absolute right-2 rounded-full h-8 w-8 
                        bg-green-600 hover:bg-green-800 transition duration-500 ease-in-out`;

  const filteredEls = activeCategory ? elements.filter(el => el.category === activeCategory) : elements

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-4 gap-4 my-8 relative">
        <CategoryList />
        <Link to='/element/add' className={stylesBtnAdd}>
                <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 py-8">
        { elements.length ?
          filteredEls.map(el => <ElementDetails {...el} categories={listCategories}  />)
          :
          <div>Loading...</div>
        }
      </div>
    </div>
  );
};

export default ElementList;
