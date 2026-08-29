import React from 'react';

const Button = ({name, color,hover, onClick}) => {
    return (
        <button onClick={onClick} className={`px-7 ${color ?? 'bg-blue-400'} ${hover ? `hover:${hover}` : 'hover:bg-blue-300'} rounded cursor-pointer`}>{name}</button>
    );
};

export default Button;