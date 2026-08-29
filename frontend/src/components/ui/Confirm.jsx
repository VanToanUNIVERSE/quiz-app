import React from 'react';
import Button from './Button';

const Confirm = ({yes, cancel}) => {
    return (
        <div className={`w-full h-full backdrop-blur-sm absolute top-0 start-0 z-10`}>
            <div className=' w-full lg:w-[40%] rounded flex flex-col justify-center items-center gap-3 z-10 shadow-2xl p-10 absolute top-[50%] start-[50%] -translate-[50%] bg-black/50'>
                <h3 className=' text-xl '>Are you sure you want to delete this item?</h3>
                <div className='flex justify-center gap-3'>
                    <Button name="Yes" onClick={yes}></Button>
                    <Button name='Cancel' onClick={cancel}></Button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;