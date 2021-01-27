import React from 'react';
import {useDispatch} from 'react-redux';
import {setActiveCategory} from '../actions/index';

const CategoryBox = ({name, activeCategory}) => {
    const isActive = name === activeCategory
    const classBox = `box-${name} ${isActive ? 'bg-green-400' : 'bg-gray-400' } mr-2 
                        rounded-full py-0.5 px-3 text-white cursor-pointer  
                        hover:bg-gray-700 transition duration-500 ease-in-out`
    const dispatch= useDispatch();

    return (
        <div className={classBox} onClick={() => {dispatch(setActiveCategory(name))}}>{name}</div>
    )
}

export default CategoryBox;