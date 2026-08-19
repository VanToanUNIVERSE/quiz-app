import React from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const HomeFooter = ({setSearchParams, totalPage}) => {
    return (
        <div className=' flex w-full md:w-[60%] mx-auto my-17 justify-between'>
            <Pagination setSearchParams={setSearchParams} totalPage={totalPage}></Pagination>
            <div>
                <Link to="/create-quiz" className='px-7 py-3 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>Create quiz</Link>
            </div>
        </div>
    );
};

export default HomeFooter;