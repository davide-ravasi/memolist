const FilterElements = (listItems, wishlist, location, activeCategory, searchTerm) => {
    let filteredElements = [];

    if(location.pathname === '/wishlist') { // only elements in wishlist - wishlist page
        filteredElements = activeCategory ? 
            listItems.filter(el => 
                    (el.category === activeCategory && wishlist.indexOf(el.id) !== -1)
                ) 
                : 
                listItems.filter(el => wishlist.indexOf(el.id) !== -1)
    } else { // all elements - homepage
        filteredElements = activeCategory ? 
            listItems.filter(el => 
                    (el.category === activeCategory)
                ) 
                : 
                listItems
    }  

    // filter by search term
    if(searchTerm) {
        filteredElements = filteredElements.filter(el => el.name.toLowerCase().includes(searchTerm))
    }

    return filteredElements;
}

export default FilterElements;