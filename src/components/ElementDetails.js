import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';

import { addToWishlist, removeFromWishlist } from '../redux/wishlist/wishlist.actions';

import { convertDateFromTimestamp } from '../outils/dateConverter';

import { faLink, faPen, faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ElementDetails = ({itemDet, categories, onRemove, isAdmin, currentUser, wishlist}) => {
    const {id, category, link, text, name, created_at, userName} = itemDet;
    const createdAtConverted = convertDateFromTimestamp(created_at);

    const [favourite, setFavourite] = useState(false);
    const dispatch = useDispatch();

    const cat = categories.find(cat => {
        return cat.name === category
    });

    useEffect(() => {
        if(wishlist && wishlist.includes(id)) {
            setFavourite(true)
        } else {
            setFavourite(false)
        }
    },[wishlist, id])

    const roundbtnStyles = 'flex justify-center items-center text-white text-sm absolute rounded-full h-6 w-6 transition duration-500 ease-in-out';

    return (
        <div key={id} className="bg-white rounded-md p-3 shadow-xl relative">
            <div className="text-gray-900 text-xl">{name}</div>
            <span className="text-gray-700 bg-gray-100 uppercase shadow-xl p-1 text-xs rounded" style={cat ? {backgroundColor: cat.color} : {}}>{category}</span>
            <div className="text-gray-500 text-xs mt-4 mb-10">
                <SyntaxHighlighter language="javascript" style={a11yDark}>
                    {text} 
                </SyntaxHighlighter>
            </div>
            <div className="absolute text-gray-400 text-xs pt-2 left-3 bottom-2">Created: {createdAtConverted}<br /> {userName && `by ${userName}`}</div>

            { currentUser && 
                <button onClick={
                        () => favourite ? 
                                dispatch(removeFromWishlist(currentUser.uid, id)) 
                                : 
                                dispatch(addToWishlist(currentUser.uid, id))
                    } 
                    className={`${roundbtnStyles} ${favourite ? 'selected bg-red-400' : 'bg-gray-400'} top-3 right-9 hover:bg-red-600`}
                >
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            }

            { link && <Link to={link} className={`${roundbtnStyles} top-3 right-2 bg-gray-400 hover:bg-gray-700`}>
                    <FontAwesomeIcon icon={faLink} />
                </Link>
            }
            
            { isAdmin &&
                <>
                <Link to={`/element/edit/${id}`} className={`${roundbtnStyles} bottom-3 right-9 bg-gray-400 hover:bg-green-700`}>
                    <FontAwesomeIcon icon={faPen} />
                </Link>
                <div className={`${roundbtnStyles} bottom-3 right-2 bg-red-400 hover:bg-red-700 cursor-pointer`} onClick={() => onRemove(itemDet)}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                </>
            }
        </div>
    )
}

export default ElementDetails;