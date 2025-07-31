import React from 'react';
import '../index.css';

const Play = () => {
    return (
        <div className=' w-[60%] mx-auto'>
            <div className=' bg-black text-blue-200 px-7 py-5 flex justify-between rounded-t-2xl'>
                <h3>Question is here</h3>
                <p>Question 1 of 10</p>
            </div>
            <div className=' shadow-2xl p-5 flex flex-col gap-3 rounded-b-2xl'>
                <div className='flex justify-start items-center gap-3 font-bold'><span className='answer cursor-pointer hover:bg-black transition-all'>A</span>Hello iEmbed code</div>
                <div className='flex justify-start items-center gap-3 font-bold'><span className='answer cursor-pointer hover:bg-black transition-all'>A</span>Hello i will nerver give up</div>
                <div className='flex justify-start items-center gap-3 font-bold'><span className='answer cursor-pointer hover:bg-black transition-all'>A</span>Hello i will nerver give up</div>
                <div className='flex justify-start items-center gap-3 font-bold'><span className='answer cursor-pointer hover:bg-black transition-all'>A</span>Hello i will nerver give up</div>
            </div>
        </div>
    );
};

export default Play;