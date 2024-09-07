import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({category}) => {
  return (
    <div>
      <div className="text-3xl p-5 bg-yellow-500 rounded-full">
        <CiForkAndKnife category={category}/>
      </div>
    </div>
  );
};

export default FilterProduct;
