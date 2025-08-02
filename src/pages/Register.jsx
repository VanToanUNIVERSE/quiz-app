import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState({});
    const [form, setForm] = useState({
        password: '',
        confirmPassword: ''
    });

    const validate = (e) => {
        const { name, value } = e.target;
        let message = null;

        if (value.trim() === "") {
            message = 'Can not empty';
        }
        if (name !== 'fullName' && value.includes(" ")) {
            message = 'Can not have spaces';
        } else {
            if (value.length < 5) {
                message = 'Must have at least 5 characters';
            }
            else {
                message = 'no error';
                if (name === 'password') {
                    setForm(prev => ({ ...prev, password: value }));
                    
                }
                if (name === 'confirmPassword') {
                    setForm(prev => ({ ...prev, confirmPassword: value }));
                    if (value !== form.password) {
                        message = 'Password and confirm password not match';
                    }
                }
            }


        }
        setError(prev => ({
            ...prev,
            [name]: message
        }));

    };

    return (
        <div className='p-1'>
            <form className='flex flex-col gap-6 p-10 w-[40%] shadow mx-auto mt-10 justify-center items-center' method='post'>
                <h1>Register</h1>
                <div className='mt-3 flex flex-col w-full'>
                    <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
                    <div className="mt-2">
                        <input onKeyUp={validate} id="username" type="text" name="username" autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <div className=' text-red-500'>{error.username === 'no error' ? <img className=" w-6 h-6 mt-2" src="/check.png"></img> : error.username} </div>
                </div>
                <div className=' flex flex-col w-full'>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div className="mt-2">
                        <input onKeyUp={validate} id="password" type="password" name="password" autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        <div className=' text-red-500'>
                            {error.password === 'no error' ? <img className=" w-6 h-6 mt-2" src="/check.png"></img> : error.password}
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col w-full'>
                    <label htmlFor="confirm password" className="block text-sm/6 font-medium text-gray-900">Confirm password</label>
                    <div className="mt-2">
                        <input onKeyUp={validate} id="confirm-password" type="password" name="confirmPassword" autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        <div className=' text-red-500'>{error.confirmPassword === 'no error' ? <img className=" w-6 h-6 mt-2" src="/check.png"></img> : error.confirmPassword} </div>
                    </div>
                </div>
                <div className='mt-2 flex flex-col w-full'>
                    <label htmlFor="full-name" className="block text-sm/6 font-medium text-gray-900">Full name</label>
                    <div className="mt-2">
                        <input onKeyUp={validate} id="full-name" type="text" name="fullName" autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        <div className=' text-red-500'>{error.fullName === 'no error' ? <img className=" w-6 h-6 mt-2" src="/check.png"></img> : error.fullName} </div>
                    </div>
                </div>


                <div className='flex justify-between w-full'>
                    <button type='submit' className='px-7 py-1 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>Register</button>
                    <Link className=' underline' to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;