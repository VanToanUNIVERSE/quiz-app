import React from 'react';
import { Link } from 'react-router-dom';

const CollectionList = ({collections}) => {
    return (
        <div className=' w-full md:w-[60%] max-h-[60vh] shadow mx-auto my-5 flex flex-col gap-3 p-3 overflow-hidden scroll-smooth'>
            {collections.map((item) => {
                return (
                    <div className=' grid grid-cols-3 items-center' key={item.id}>
                        <div className="flex justify-start">
                            <h3 className=' font-bold'>{item.name}</h3>
                        </div>
                        <div className="flex justify-center">
                            <p>{item.quiz_count} questions</p>
                        </div>
                        <div className="flex justify-end">
                            <Link className='px-7 py-3 bg-lime-500 hover:bg-lime-400 rounded inline-block w-fit' to={`/play?id=${item.id}`}>
                                Play
                            </Link>
                        </div>
                    </div>);
            })}
        </div>
    );
};

export default CollectionList;