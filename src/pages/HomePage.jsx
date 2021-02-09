import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchList } from '../redux/list/list.actions';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CategoriesWrapper from "../components/CategoriesWrapper";
import ElementsWrapper from '../components/ElementsWrapper';

const HomePage = (props) => {
  const dispatch = useDispatch();

  const stylesBtnAdd = `flex justify-center items-center text-white 
                        text-sm absolute right-2 rounded-full h-8 w-8 
                        bg-green-600 hover:bg-green-800 transition duration-500 ease-in-out`;

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="my-8 relative">
        <CategoriesWrapper />
        <Link to='/element/add' className={stylesBtnAdd}>
                <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
      <ElementsWrapper />
    </div>
  );
};

export default HomePage;
