import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateSearchterm } from "../redux/list/list.actions";

const SearchEngine = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.list);

  return (
    <div className="relative mx-4 my-2">
      <form>
        <input
          type="search"
          className="bg-purple-white shadow rounded border-0 p-3 w-full"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => dispatch(updateSearchterm(e.target.value))}
        />
      </form>
      {/* <div class="absolute pin-r pin-t mt-3 mr-4 text-purple-lighter">
         <svg version="1.1" 
                    className="h-4 text-dark" 
                    xmlns="http://www.w3.org/2000/svg" 
                    x="0px" 
                    y="0px"            
                    viewBox="0 0 52.966 52.966" 
                    style="enable-background:new 0 0 52.966 52.966;"
                    >
                <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
                c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
                C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
                S32.459,40,21.983,40z"/>
            </svg>
      </div> */}
    </div>
  );
};

export default SearchEngine;
