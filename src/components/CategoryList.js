import React from 'react';
import {useSelector} from 'react-redux'

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {useDispatch} from 'react-redux';
import {setActiveCategory} from '../redux/categories/categories.actions';

import CategoryBox from './CategoryBox';
import ButtonIcon from '../components/ButtonIcon';

import Spinner from './Spinner';

const CategoryList = () => {
    const {listCategories, activeCategory} = useSelector(state => state.categories);
    const dispatch= useDispatch();
    const removeFilter = () => {
        dispatch(setActiveCategory(''));
    }
    
    return(
        <div className="flex">
            {listCategories.map(cat => (
                <CategoryBox name={cat.name} activeCategory={activeCategory} />))
            }
            { activeCategory &&
                <ButtonIcon clickEvent={removeFilter} bgColor={'bg-red-500 hover:bg-red-700'}>
                    <FontAwesomeIcon icon={faTimes} />
                </ButtonIcon>
            }            
        </div>
    )
}

export default CategoryList;