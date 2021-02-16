import React from 'react';

import CategoryBox from './CategoryBox';

const CategoriesList = ({activeCategory, listCategories}) => { 
    return(
        <div className="flex px-4 float-left">
            {listCategories.map(cat => (
                <CategoryBox key={cat.name} name={cat.name} activeCategory={activeCategory} />))
            }         
        </div>
    )
}

export default CategoriesList;