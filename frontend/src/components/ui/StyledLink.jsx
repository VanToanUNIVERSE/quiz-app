import React from 'react';
import { Link } from 'react-router-dom';

const StyledLink = ({color, hover, name, to}) => {
    return (
        <Link className={`px-7 py-1 ${color ?? 'bg-blue-400'} ${hover ? `hover:${hover}` : 'hover:bg-blue-300'} rounded cursor-pointer`} to={to}>{name}</Link>
    );
};

export default StyledLink;