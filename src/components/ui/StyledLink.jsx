import React from 'react';
import { Link } from 'react-router-dom';

const StyledLink = ({color, name, to}) => {
    return (
        <Link className={`px-7 py-1 ${color ?? 'bg-blue-400'} hover:bg-blue-400 rounded cursor-pointer`} to={to}>{name}</Link>
    );
};

export default StyledLink;