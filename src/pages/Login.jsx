import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputGroup from '../components/InputGroup';
import { validate } from '../helpers/validators';
import Message from '../components/Message';

const Login = () => {
    const [error, setError] = useState({});
    const [response, setResponse] = useState({
        message: '',
        status: '',
    });
    const [form, setForm] = useState({ password: '' });
    const handleValidate = (e) => {
        validate(e, form, setForm, setError);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const hasError = Object.values(error).some(
            (err) => err && err !== 'no error'
        );
        const hasEmptyField = Object.values(form).some(
            (val) => val.trim() === ''
        );

        if (hasError || hasEmptyField) {
            alert("Vui lòng nhập đúng thông tin.");
            return;
        }
        fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': document.getElementById('username').value,
                'password': document.getElementById('password').value
            })
        }).then(res => res.json())
            .then(data => {
                setResponse({ message: data.message, status: data.errors });
                if (!data.errors) {
                    // Lưu user vào localStorage
                    console.log(data.token);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            })
            .catch(err => console.log("Error: ", err));

    };
    const invisible = () => {
        setResponse({ message: '', status: '' });
    }
    return (
        <div className='p-1'>
            <form className='flex flex-col gap-1 p-10 w-[40%] shadow mx-auto mt-20 justify-center items-center rounded' method='post' onSubmit={handleSubmit}>
                <h1>Login</h1>
                <InputGroup label="Username" for="username" id="username" name="username" type="text" onChange={handleValidate} error={error.username}></InputGroup>
                <InputGroup label="Password" for="password" id="password" name="password" type="password" onChange={handleValidate} error={error.password}></InputGroup>
                <div className='flex justify-between w-full mt-2'>
                    <button id='submit-btn' type='submit' className='px-7 py-1 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>Login</button>
                    <Link to="/register" className=' underline' >Register</Link>
                </div>
                <Message onClick={invisible} visible={response.message != '' ? '' : 'invisible'} message={response.message || 'The account has been created'} to={response.status ? '/register' : '/'}></Message>

            </form>
        </div>
    );
};

export default Login;