import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../helpers/logout';

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');
    return (
        <div className='p-10'>
            <div className='  flex justify-between items-center'>
                <div className='flex justify-between gap-3 items-center'>
                    <div className=' w-13 h-13 rounded-full'>
                        <img className=' w-full h-full rounded-full' src="https://picsum.photos/300/200"></img>
                    </div>
                    <p className=' font-bold'>{user.fullName || ''}</p>
                </div>

                <h2 className='font-bold text-2xl'>Wellcome to quizzes</h2>
                
                {user != '' ? (<button
                    onClick={(e) => {
                        e.preventDefault();
                        logout(setUser);
                    }}
                    className="px-7 py-3 bg-red-500 hover:bg-red-400 rounded text-white"
                >
                    Logout
                </button>) : <Link className=' px-7 py-3 bg-red-500 hover:bg-red-400 rounded' to="/login">Login</Link>}
            </div>
            <div className=' w-[60%] max-h-[60vh] shadow mx-auto my-5 flex flex-col gap-3 p-3 overflow-hidden scroll-smooth'>
                <div className=' flex justify-between items-center'>
                    <h3 className=' font-bold'>Quiz name</h3>
                    <p>20 questions</p>
                    <Link className=' px-7 py-3 bg-lime-500 hover:bg-lime-400 rounded' to="/play">
                        Play
                    </Link>
                </div>
                <div className=' flex justify-between items-center'>
                    <h3 className=' font-bold'>Quiz name</h3>
                    <p>20 questions</p>
                    <Link className=' px-7 py-3 bg-lime-500 hover:bg-lime-400 rounded' to="/play">
                        Play
                    </Link>
                </div>
                <div className=' flex justify-between items-center'>
                    <h3 className=' font-bold'>Quiz name</h3>
                    <p>20 questions</p>
                    <Link className=' px-7 py-3 bg-lime-500 hover:bg-lime-400 rounded' to="/play">
                        Play
                    </Link>
                </div>
                <div className=' flex justify-between items-center'>
                    <h3 className=' font-bold'>Quiz name</h3>
                    <p>20 questions</p>
                    <Link className=' px-7 py-3 bg-lime-500 hover:bg-lime-400 rounded' to="/play">
                        Play
                    </Link>
                </div>

            </div>
            <div className=' flex w-[60%] mx-auto my-17 justify-between'>
                <div className='flex justify-center items-center gap-3 '>
                    <button className=' cursor-pointer'>Pre-vious</button>
                    <button className=' cursor-pointer'>1</button>
                    <button className=' cursor-pointer'>2</button>
                    <button className=' cursor-pointer'>3</button>
                    <button className=' cursor-pointer'>Next</button>
                </div>
                <div>
                    <button className='px-7 py-3 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>Create quiz</button>
                </div>
            </div>

        </div>
    );
};

export default Home;