import React from 'react';

const TypeProduct = ({ name, onClick, isSelected }) => {
    return (
        <div 
            onClick={onClick} 
            className={`ml-[25px] text-[14px] cursor-pointer font-bold ${
                isSelected ? 'text-red-500' : 'text-black hover:text-red-500'
            }`}
        >
            {name}
        </div>
    );
};

export default TypeProduct;