import React from 'react';

const InputGroup = (props) => {
    return (
        <div className='flex flex-col w-full relative'>
                <input value={props.value} onChange={props.onChange} id={props.id} type={props.type} name={props.name} placeholder={props.placeholder} required={props.required || true} className=" input-field block w-full rounded-4xl bg-transparent px-5 py-3 text-base text-gray-200 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                <label  htmlFor={props.for} className=" label absolute start-[20px] top-[50%] -translate-y-[50%] text-white block text-sm/6 font-medium transition-all duration-300">{props.label}</label>
                <div className=' text-red-400 absolute right-3 top-[50%] translate-y-[-50%]'>{props.error === 'no error' ? <img className=" opacity-70 w-6 h-6 mt-2 -translate-y-0.5" src="/check.png"></img> : props.error} </div>
        </div>
    );
};

export default InputGroup;