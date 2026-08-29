import React from 'react';

const Pagination = ({totalPage, setSearchParams}) => {
    return (
        <div className='flex justify-center items-center gap-3 '>
            <button className=' cursor-pointer'>Pre-vious</button>
            {Array(totalPage).fill(0).map((item, index) => {
                return (
                    <button onClick={() => setSearchParams({ page: index + 1 })} className=' cursor-pointer' key={index}>{index + 1}</button>
                )
            })}

            <button className=' cursor-pointer'>Next</button>
        </div>
    );
};

export default Pagination;