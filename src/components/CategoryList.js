import React from 'react';
import {useSelector} from 'react-redux'

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {useDispatch} from 'react-redux';
import {setActiveCategory} from '../redux/categories/categories.actions';

import CategoryBox from './CategoryBox';
import ButtonIcon from '../components/ButtonIcon';

const CategoryList = () => {
    const {listCategories, activeCategory} = useSelector(state => state.categories);
    const dispatch= useDispatch();
    const removeFilter = () => {
        dispatch(setActiveCategory(''));
    }
    return(
        <div className="flex">
            {listCategories.length ?
             listCategories.map(cat => (
                <CategoryBox name={cat.name} activeCategory={activeCategory} />))
             : <div>...loading categories</div>   
            }
            { activeCategory &&
                // <div className="mr-2 rounded-full py-0.5 px-3 text-white cursor-pointer bg-red-500 
                //             hover:bg-red-700 transition duration-500 ease-in-out" onClick={removeFilter}>
                //                 <FontAwesomeIcon icon={faTimes} />
                // </div>
                <ButtonIcon clickEvent={removeFilter} bgColor={'bg-red-500 hover:bg-red-700'}>
                    <FontAwesomeIcon icon={faTimes} />
                </ButtonIcon>
            }            
        </div>
    )
}

export default CategoryList;