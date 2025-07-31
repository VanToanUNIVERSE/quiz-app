import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='p-1'>
            <form className='flex flex-col gap-6 p-10 w-[40%] shadow mx-auto mt-20 justify-center items-center'>
                <h1>Login</h1>
                <div className='mt-10 flex flex-col w-full'>
                    <label for="first-name" className="block text-sm/6 font-medium text-gray-900">Username</label>
                    <div className="mt-2">
                        <input id="first-name" type="text" name="first-name" autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div className=' flex flex-col w-full'>
                    <label for="first-name" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div className="mt-2">
                        <input id="first-name" type="password" name="first-name" autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                 
                <div className='flex justify-between w-full'>
                    <button className='px-7 py-1 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>Login</button>
                    <Link to="/register" className=' underline' >Register</Link>
                </div>
                
            </form>
        </div>
    );
};

export default Login;