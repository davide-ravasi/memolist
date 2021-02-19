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
      <h1 className="mt-8 mx-4 font-md text-2xl">Code snippets library</h1>
      <div className="py-4 mx-4 mt-1 mb-0 p-2 pl-0 relative flow-root">
        <CategoriesWrapper />
      </div>
      <ElementsWrapper />
    </div>
  );
};

export default HomePage;
