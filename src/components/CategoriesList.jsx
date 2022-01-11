import React from "react";

import CategoryBox from "./CategoryBox";

const CategoriesList = ({ activeCategory, listCategories }) => {
  return (
    <div className="md:flex">
      {listCategories
        .filter((cat) => cat.count > 0)
        .map((cat) => (
          <CategoryBox
            key={cat.name}
            count={cat.count}
            name={cat.name}
            activeCategory={activeCategory}
          />
        ))}
    </div>
  );
};

export default CategoriesList;
