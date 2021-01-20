import React from 'react';
import {useSelector} from 'react-redux'
import CategoryBox from './CategoryBox';

const CategoryList = () => {
    const {listCategories, activeCategory} = useSelector(state => state.categories);
    return(
        <div className="flex">
            {listCategories.length ?
             listCategories.map(cat => (
                <CategoryBox name={cat.name} activeCategory={activeCategory} />))
             : <div>...loading categories</div>   
        }
        </div>
    )
}

export default CategoryList;