import React, { useState } from 'react';
import { logout } from '../../helpers/logout';
import { Link } from 'react-router-dom';
import Loading from '../ui/Loading';

const HomeHeader = ({ user, setUser }) => {
    const [loading, setLoading] = useState(false);
    return (
        <div className='  flex justify-between items-center text-center'>
            {loading ? <Loading></Loading> : ''}
            {user && user !== '' && (
                <div className='flex justify-between gap-3 items-center'>
                    <Link className=' w-13 h-13 rounded-full' to="/profile">
                        <img alt='Avara' className=' w-full h-full rounded-full' src={`http://127.0.0.1:8000/storage/${user.image}`}></img>
                    </Link>
                    <p className=' font-bold'>{user.fullName || ''}</p>
                </div>
            )}

            <h2 className='font-bold text-2xl'>Wellcome to quizzes</h2>
            {user != '' ? (<button
                onClick={(e) => {
                    e.preventDefault();
                    logout(setUser, setLoading);
                }}
                className="px-7 py-3 bg-red-500 hover:bg-red-400 rounded text-white cursor-pointer"
            >
                Logout
            </button>) : <Link className=' px-7 py-3 bg-red-500 hover:bg-red-400 rounded' to="/login">Login</Link>}
        </div>
    );
};

export default HomeHeader;