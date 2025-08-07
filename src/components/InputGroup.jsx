import React from 'react';

const InputGroup = (props) => {
    return (
        <div className='flex flex-col w-full '>
            <label htmlFor={props.for} className="block text-sm/6 font-medium text-gray-900">{props.label}</label>
            <div className=" relative">
                <input onKeyUp={props.onKeyUp} id={props.id} type={props.type} name={props.name} placeholder={props.placeholder} required={props.required} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                <div className=' text-red-400 absolute right-3 top-[50%] translate-y-[-50%]'>{props.error === 'no error' ? <img className=" opacity-70 w-6 h-6 mt-2 -translate-y-0.5" src="/check.png"></img> : props.error} </div>
            </div> 
        </div>
    );
};

export default InputGroup;