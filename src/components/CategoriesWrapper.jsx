import React from 'react';
import {useSelector, useDispatch } from 'react-redux'

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {setActiveCategory} from '../redux/categories/categories.actions';

import ButtonIcon from '../components/ButtonIcon';
import CategoriesList from './CategoriesList';
import Spinner from './Spinner';

const CategoriesWrapper = () => {
    const {activeCategory} = useSelector(state => state.categories);
    const dispatch= useDispatch();

    const {listCategories} = useSelector(state => state.categories);

    const removeFilter = () => {
        dispatch(setActiveCategory(''));
    }
      
    return(
        <>
            {
                listCategories.length ? 
                    <CategoriesList listCategories={listCategories} activeCategory={activeCategory} /> :
                    <Spinner bgColor={'text-black'} text={'loading categories'} />
            }
            { activeCategory &&
                <div className="float-left ml-4 md:ml-0 mt-2 md:mt-0">
                    <ButtonIcon clickEvent={removeFilter} bgColor={'bg-red-500 hover:bg-red-700'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </ButtonIcon>
                </div>
            }            
        </>
    )
}

export default CategoriesWrapper;

