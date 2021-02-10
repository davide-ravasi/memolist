import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { db } from "../firebase";

import ElementDetails from "./ElementDetails";

const ElementsList = ({onRemove, listItems}) => {
    const selectCats = state => state.categories;
    const {listCategories, activeCategory} = useSelector(selectCats);

    const filteredEls = activeCategory ? listItems.filter(el => el.category === activeCategory) : listItems

    useEffect(() => {
        const unsubscribe = db.collection("notes")
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "removed") {
                    console.log("Removed element: ", change.doc.data());
                }
            });
        });

        return () => unsubscribe();
      }, []);

    return (
        <div className="grid grid-cols-4 gap-4 py-8">
            {filteredEls.map(el => 
                    <ElementDetails 
                        itemDet={el}
                        categories={listCategories} 
                        onRemove={onRemove} /> 
                )
            }
        </div>  
)}

export default ElementsList;