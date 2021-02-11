import React, { useEffect } from "react";

import { useDispatch } from 'react-redux';
import { fetchList } from '../redux/list/list.actions';

import CategoriesWrapper from "../components/CategoriesWrapper";
import ElementsWrapper from '../components/ElementsWrapper';

const HomePage = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="my-8 relative">
        <CategoriesWrapper />
      </div>
      <ElementsWrapper />
    </div>
  );
};

export default HomePage;
