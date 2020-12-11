import React, { useEffect } from "react";
import ElementDetails from "./ElementDetails";
import { useSelector, useDispatch } from 'react-redux';
import { fetchList } from '../actions/';


const ElementList = (props) => {
  const selectEls = state => state.list;
  const elements = useSelector(selectEls);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-4 gap-4 py-8">
        { elements.length ?
          elements.map(el => <ElementDetails {...el} />)
          :
          <div>Loading...</div>
        }
      </div>
    </div>
  );
};

export default ElementList;
