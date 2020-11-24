import React from 'react';

import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ElementDetails = () => {
    return (
        <div className="bg-white rounded-md p-3 shadow-xl relative">
                <div className="text-gray-900 text-xl">Name 1</div>
                <span className="text-gray-600 bg-gray-100 uppercase shadow-xl px-1 text-xs rounded">Category 1</span>
                <div className="text-gray-400 text-sm">Description descriptions......</div>
                <a href="#" className="flex justify-center items-center text-white text-sm absolute top-3 right-2 rounded-full h-6 w-6 bg-gray-400 hover:bg-gray-700 transition duration-500 ease-in-out">
                    <FontAwesomeIcon icon={faLink} />
                </a>
        </div>
    )
}

export default ElementDetails;