import React from 'react';
import { useSelector } from 'react-redux';

import ElementDetails from "./ElementDetails";

const ElementsList = ({onRemove, listItems}) => {
    const selectCats = state => state.categories;
    const {listCategories, activeCategory} = useSelector(selectCats);

    const filteredEls = activeCategory ? listItems.filter(el => el.category === activeCategory) : listItems

    return (
        <div className="grid grid-cols-4 gap-4 py-8">
            {filteredEls.map(el => 
                    <ElementDetails 
                        {...el} 
                        categories={listCategories} 
                        onRemove={onRemove} /> 
                )
            }
        </div>  
)}

export default ElementsList;