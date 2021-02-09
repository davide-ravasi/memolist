import React from 'react';

import CategoryBox from './CategoryBox';

const CategoriesList = ({activeCategory, listCategories}) => { 
    return(
        <div className="flex">
            {listCategories.map(cat => (
                <CategoryBox name={cat.name} activeCategory={activeCategory} />))
            }         
        </div>
    )
}

export default CategoriesList;