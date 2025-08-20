import React from 'react';

const Button = ({name, color}) => {
    return (
        <button className={`px-7 py-1 ${color ?? 'bg-blue-400'} hover:bg-blue-400 rounded cursor-pointer`}>{name}</button>
    );
};

export default Button;