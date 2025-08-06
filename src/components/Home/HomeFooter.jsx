import React from 'react';
import Pagination from './Pagination';

const HomeFooter = ({setSearchParams, totalPage}) => {
    return (
        <div className=' flex w-full md:w-[60%] mx-auto my-17 justify-between'>
            <Pagination setSearchParams={setSearchParams} totalPage={totalPage}></Pagination>
            <div>
                <button className='px-7 py-3 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>Create quiz</button>
            </div>
        </div>
    );
};

export default HomeFooter;