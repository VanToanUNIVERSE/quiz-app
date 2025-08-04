import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputGroup from '../components/InputGroup';
import { validate } from '../helpers/validators';
import Message from '../components/Message';

const Register = () => {
    const [error, setError] = useState({});
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: ''
    });
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

        if (hasError || hasEmptyField) {
            alert("Please fix the errors");
            return;
        }
        fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': form.username,
                'password': form.password,
                'fullName': form.fullName
            })
        })
            .then(res => res.json())
            .then(data => {
                setResponse({ message: data.message, status: data.errors });
                if (!data.errors) {
                    // Lưu user vào localStorage
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            })
            .catch(err => console.log("err:", err));
    };

    const invisible = () => {
        setResponse({ message: '', status: '' });
    }

    return (
        <div className='p-1'>
            <form method='post' onSubmit={handleSubmit} className='flex flex-col gap-1 p-10 w-[40%] shadow mx-auto mt-5 justify-center items-center rounded' >
                <h1>Register</h1>
                <InputGroup label="Username" for="username" id="username" name="username" type="text" onKeyUp={handleValidate} error={error.username}></InputGroup>
                <InputGroup label="Password" for="password" id="password" name="password" type="password" onKeyUp={handleValidate} error={error.password}></InputGroup>
                <InputGroup label="Confirm password" for="confirm-password" id="confirm-password" name="confirmPassword" type="password" onKeyUp={handleValidate} error={error.confirmPassword}></InputGroup>
                <InputGroup label="Full Name" for="full-name" id="full-name" name="fullName" type="text" onKeyUp={handleValidate} error={error.fullName}></InputGroup>
                <div className='flex justify-between w-full mt-2'>
                    <button type='submit' className='px-7 py-1 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>Register</button>
                    <Link className=' underline' to="/login">Login</Link>
                </div>
                <Message onClick={invisible} visible={response.message != '' ? '' : 'invisible'} message={response.message || 'The account has been created'} to={response.status ? '/register' : '/'}></Message>
            </form>
        </div>
    );
};

export default Register;