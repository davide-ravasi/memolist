import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ElementDetails from "./ElementDetails";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ElementsList = ({onRemove, listItems}) => {
    const selectCats = state => state.categories;
    const {listCategories, activeCategory} = useSelector(selectCats);
    const selectUser = state => state.user;
    const {currentUser} = useSelector(selectUser);
    const [isAdmin, setIsAdmin] = useState(false);

    const stylesBtnAdd = `flex justify-center items-center text-white 
    text-sm absolute right-2 rounded-full h-8 w-8 
    bg-green-600 hover:bg-green-800 transition duration-500 ease-in-out`;

    const filteredEls = activeCategory ? listItems.filter(el => el.category === activeCategory) : listItems


    useEffect(() => {
        (currentUser && currentUser.admLvl === true) ? setIsAdmin(true) : setIsAdmin(false)
      }, [currentUser]);

    return (
        <>
            {isAdmin && <Link to='/element/add' className={stylesBtnAdd}>
                <FontAwesomeIcon icon={faPlus} />
            </Link>}
            <div className="grid grid-cols-4 gap-4 py-8">
                {filteredEls.map(el => 
                    <ElementDetails 
                        key={el.id}
                        itemDet={el}
                        categories={listCategories} 
                        onRemove={onRemove}
                        isAdmin={isAdmin} /> 
                    )
                }
            </div> 
        </> 
)}

export default ElementsList;