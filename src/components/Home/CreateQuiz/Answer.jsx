import React from 'react';
import InputGroup from '../../InputGroup';

const Answer = (props) => {
    return (   
            <div className='flex w-full justify-between items-center m-2'>
                <input onChange={props.onChange} className='flex-1/5 w-6 h-6 accent-indigo-600' type='radio'  name={`answer-${props.name}`} checked={props.checked}></input>
                <div className=" relative flex-4/5">
                    <input required onKeyUp={props.onKeyUp} id={props.id} type={props.type} name={props.name} placeholder={props.placeholder} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    <div className=' text-red-400 absolute right-3 top-[50%] translate-y-[-50%]'>{props.error === 'no error' ? <img className=" opacity-70 w-6 h-6 mt-2 -translate-y-0.5" src="/check.png"></img> : props.error} </div>
                </div>
            </div>  
    );
};

export default Answer;