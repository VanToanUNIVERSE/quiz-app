import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputGroup from '../components/ui/InputGroup';
import { validate } from '../helpers/validators';
import Message from '../components/ui/Message';
import Loading from '../components/ui/Loading';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: ''
    });
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState({
        message: '',
        status: '',
    });

    const handleValidate = (e) => {
        validate(e, form, setForm, setError);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasError = Object.values(error).some(
            (err) => err && err !== 'no error'
        );
        const hasEmptyField = Object.values(form).some(
            (val) => val.trim() === ''
        );

        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('password', form.password);
        formData.append('fullName', form.fullName);
        if(file) {
            formData.append('image', file);
        }

        if (hasError || hasEmptyField) {
            alert("Please fix the errors");
            return;
        }
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setResponse({ message: data.message, status: data.errors });
                setLoading(false);
                if (!data.errors) {
                    // Lưu user vào localStorage
                    console.log(data.status);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            })
            .catch(err => console.log("err:", err));
    };

    const invisible = () => {
        setResponse({ message: '', status: '' });
        
    }

    return (
        <div className='p-1 background-image-random'>
            <form method='post' onSubmit={handleSubmit} className=' bg-transparent border border-amber-50 backdrop-blur-sm relative flex flex-col gap-5 p-10 pt-20 w-full lg:w-[40%] shadow mx-auto m-10 justify-center items-center rounded' encType="multipart/form-data">
                <div id='login-header' className=' bg-amber-200 absolute top-0 start-[50%] -translate-x-[50%] p-3 rounded-b-2xl'>
                    <span className=' text-3xl'>Register</span>
                </div>
                <InputGroup label="Username" for="username" id="username" name="username" type="text" onChange={handleValidate} error={error.username}></InputGroup>
                <div className="relative w-full">
                    <InputGroup label="Password" for="password" id="password" name="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleValidate} error={error.password} />
                    <button type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>

                <div className="relative w-full">
                    <InputGroup label="Confirm password" for="confirm-password" id="confirm-password" name="confirmPassword" type={showPassword ? 'text' : 'password'} onChange={handleValidate} error={error.confirmPassword}></InputGroup>
                    <button type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                </div>
                
                <InputGroup label="Full Name" for="full-name" id="full-name" name="fullName" type="text" onChange={handleValidate} error={error.fullName}></InputGroup>
                <div className='flex flex-col w-full '>
                    <label className="block mb-2 text-sm font-medium text-white dark:text-white" htmlFor="file_input">Image: </label>
                    <input onChange={(e) => setFile(e.target.files[0])} className="block w-full text-sm text-white outline-1 rounded outline-gray-300
                        file:me-4 file:py-2 file:px-3
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-gray-500 file:text-white
                        hover:file:bg-blue-400
                        file:disabled:opacity-50 file:disabled:pointer-events-none file:cursor-pointer
                        dark:text-neutral-500
                        dark:file:bg-blue-500
                        dark:hover:file:bg-blue-400" id="image" name='image' type="file" />
                </div>
                <div className='flex justify-between w-full mt-2'>
                    <button type='submit' className='px-7 py-1 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>{loading ? <Loading></Loading> : 'Register'}</button>
                    <Link className=' underline text-white' to="/login">Login</Link>
                </div>
                <Message onClick={invisible} visible={response.message != '' ? '' : 'invisible'} message={response.message || 'The account has been created'} to={response.status ? '/register' : '/'}></Message>
            </form>
        </div>
    );
};

export default Register;