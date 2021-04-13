import React from 'react';

import CategoryBox from './CategoryBox';

const CategoriesList = ({activeCategory, listCategories}) => { 
    return(
        <div className="flex float-left">
            {listCategories.map(cat => (
                <CategoryBox key={cat.name} count={cat.count} name={cat.name} activeCategory={activeCategory} />))
            }         
        </div>
    )
}

export default CategoriesList;