import React from 'react';

const TypeProduct = ({ name, onClick, isSelected }) => {
    return (
        <div 
            onClick={onClick} 
            className={`ml-[25px] text-3xl cursor-pointer font-bold ${
                isSelected ? 'text-cyan' : 'text-black hover:text-yellow-500'
            }`}
        >
            {name}
        </div>
    );
};

export default TypeProduct;