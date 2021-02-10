import React from 'react';
import { Link } from 'react-router-dom';

import { convertDateFromTimestamp } from '../outils/dateConverter';

import { faLink, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ElementDetails = ({itemDet, categories, onRemove}) => {
    const {id, category, link, text, name, created_at, userName} = itemDet;
    const createdAtConverted = convertDateFromTimestamp(created_at);

    const cat = categories.find(cat => {
        return cat.name === category
    });

    const roundbtnStyles = 'flex justify-center items-center text-white text-sm absolute rounded-full h-6 w-6 transition duration-500 ease-in-out';

    return (
        <div key={id} className="bg-white rounded-md p-3 shadow-xl relative">
            <div className="text-gray-900 text-xl">{name}</div>
            <span className="text-gray-600 bg-gray-100 uppercase shadow-xl px-1 text-xs rounded" style={cat ? {backgroundColor: cat.color} : {}}>{category}</span>
            <div className="text-gray-500 text-sm">{text}</div>
            <div className="text-gray-400 text-xs pt-2">Created: {createdAtConverted}<br /> {userName && `by ${userName}`}</div>
            <Link to={link} className={`${roundbtnStyles} top-3 right-2 bg-gray-400 hover:bg-gray-700`}>
                <FontAwesomeIcon icon={faLink} />
            </Link>
            <Link to={`/element/edit/${id}`} className={`${roundbtnStyles} bottom-3 right-9 bg-gray-400 hover:bg-green-700`}>
                <FontAwesomeIcon icon={faPen} />
            </Link>
            <div className={`${roundbtnStyles} bottom-3 right-2 bg-red-400 hover:bg-red-700 cursor-pointer`} onClick={() => onRemove(itemDet)}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
    )
}

export default ElementDetails;