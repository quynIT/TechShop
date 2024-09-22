import React from 'react';

const TypeProduct = ({name}) => {
    return (
        <div className='ml-[25px] text-black hover:text-red-500 text-[14px] cursor-pointer font-bold'>{name}</div>
    );
};

export default TypeProduct;