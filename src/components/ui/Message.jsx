import React from 'react';
import { Link } from 'react-router-dom';

const Message = (props) => {
    
    return (
        <div className={`w-full h-full backdrop-blur-sm absolute top-0 start-0 ${props.visible}`}>
            <div className=' w-full lg:w-[40%] rounded flex flex-col justify-center items-center gap-3 z-10 shadow-2xl p-10 absolute top-[50%] start-[50%] -translate-[50%] bg-black/50'>
                <h3 className=' text-3xl '>{props.message}</h3>
                <Link  to={props.to} ><button className=' px-6 py-3 bg-lime-400 rounded cursor-pointer' onClick={() => props.onClick()}>Ok</button></Link>
            </div>
        </div>
    );
};

export default Message;