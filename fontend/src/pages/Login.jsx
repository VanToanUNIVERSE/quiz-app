import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputGroup from '../components/ui/InputGroup';
import { validate } from '../helpers/validators';
import Message from '../components/ui/Message';
import Loading from '../components/ui/Loading';

const Login = () => {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
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
                setResponse({ message: data.message, status: data.status });
                setLoading(false);
                if (!data.errors) {
                    // Lưu user vào localStorage
                    
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
        <div className='p-1 background-image-random'>
            <form className=' bg-transparent border border-amber-50 backdrop-blur-sm relative flex flex-col gap-5 p-10 pt-20 w-[40%] shadow mx-auto mt-20 justify-center items-center rounded' method='post' onSubmit={handleSubmit}>
                <div id='login-header' className=' bg-amber-200 absolute top-0 start-[50%] -translate-x-[50%] p-3 rounded-b-2xl'>
                    <span className=' text-3xl'>Login</span>
                </div>
                
                <InputGroup label="Username" for="username" id="username" name="username" type="text" onChange={handleValidate} error={error.username}></InputGroup>
                <InputGroup label="Password" for="password" id="password" name="password" type="password" onChange={handleValidate} error={error.password}></InputGroup>
                <div className='flex justify-between w-full mt-2'>
                    <button id='submit-btn' type='submit' className='px-7 py-1 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>{loading ? <Loading></Loading> : 'Login'}</button>
                    <Link to="/register" className=' underline text-white' >Register</Link>
                </div>
                <Message onClick={invisible} visible={response.message != '' ? '' : 'invisible'} message={response.message || 'The account has been created'} to={response.status ? '/' : '/login'}></Message>
                <button></button>
            </form>
        </div>
    );
};

export default Login;