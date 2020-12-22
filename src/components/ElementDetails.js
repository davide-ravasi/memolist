import React from 'react';
import { Link } from 'react-router-dom';

import { faLink, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { text } from '@fortawesome/fontawesome-svg-core';

const ElementDetails = (props) => {
    const {id, status, userId, color, category, link, text, name} = props;
    return (
        <div key={id} className="bg-white rounded-md p-3 shadow-xl relative">
            <div className="text-gray-900 text-xl">{name}</div>
            <span className="text-gray-600 bg-gray-100 uppercase shadow-xl px-1 text-xs rounded">{category}</span>
            <div className="text-gray-400 text-sm">{text}</div>
            <Link to={link} className="flex justify-center items-center text-white text-sm absolute top-3 right-2 rounded-full h-6 w-6 bg-gray-400 hover:bg-gray-700 transition duration-500 ease-in-out">
                <FontAwesomeIcon icon={faLink} />
            </Link>
            <Link to={`/element/edit/${id}`} className="flex justify-center items-center text-white text-sm absolute bottom-3 right-2 rounded-full h-6 w-6 bg-gray-400 hover:bg-gray-700 transition duration-500 ease-in-out">
                <FontAwesomeIcon icon={faPen} />
            </Link>
        </div>
    )
}

export default ElementDetails;