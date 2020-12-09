import React, { useEffect } from "react";
import ElementDetails from "./ElementDetails";
import { connect } from 'react-redux';
import { fetchList } from '../actions/';
import { PreviousMap } from "postcss";


const ElementList = (props) => {
  useEffect(() => {
    props.fetchList();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-4 gap-4 py-8">
        <ElementDetails />
        <ElementDetails />
        <ElementDetails />
        <ElementDetails />
        <ElementDetails />
        <ElementDetails />
        <ElementDetails />
        <ElementDetails />
        <ElementDetails />
        <ElementDetails />
      </div>
    </div>
  );
};

export default connect(null, { fetchList })(ElementList);
