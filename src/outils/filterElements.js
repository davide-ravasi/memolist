const FilterElements = (listItems, wishlist, location, activeCategory) => {
    if(location.pathname === '/wishlist') {
        return activeCategory ? 
            listItems.filter(el => 
                    (el.category === activeCategory && wishlist.indexOf(el.id) !== -1)
                ) 
                : 
                listItems.filter(el => wishlist.indexOf(el.id) !== -1)
    } else {
        return activeCategory ? 
            listItems.filter(el => 
                    (el.category === activeCategory)
                ) 
                : 
                listItems
    }  
}

export default FilterElements;