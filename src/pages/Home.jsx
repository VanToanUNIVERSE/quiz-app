import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { logout } from '../helpers/logout';

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');
    const [collections, setCollections] = useState([]);
    const [totalPage, setToTalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/collections?page=${page}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {

                    setCollections(data.data);
                    setToTalPage(Math.ceil(data.meta.total / 5))
                }
            })
            .catch(err => console.log('Error: ', err))
    }, [page]);
    return (
        <div className=' h-full w-full absolute p-2 md:p-10'>
            <div className='  flex justify-between items-center text-center'>
                <div className='flex justify-between gap-3 items-center'>
                    <div className=' w-13 h-13 rounded-full'>
                        <img alt='Avara' className=' w-full h-full rounded-full' src={`http://127.0.0.1:8000/storage/${user.image}`}></img>
                    </div>
                    <p className=' font-bold'>{user.fullName || ''}</p>
                </div>

                <h2 className='font-bold text-2xl'>Wellcome to quizzes</h2>

                {user != '' ? (<button
                    onClick={(e) => {
                        e.preventDefault();
                        logout(setUser);
                    }}
                    className="px-7 py-3 bg-red-500 hover:bg-red-400 rounded text-white cursor-pointer"
                >
                    Logout
                </button>) : <Link className=' px-7 py-3 bg-red-500 hover:bg-red-400 rounded' to="/login">Login</Link>}
            </div>
            <div className=' w-full md:w-[60%] max-h-[60vh] shadow mx-auto my-5 flex flex-col gap-3 p-3 overflow-hidden scroll-smooth'>
                {collections.map((item) => {
                    return (
                        <div className=' grid grid-cols-3 items-center' key={item.id}>
                            <div className="flex justify-start">
                                <h3 className=' font-bold'>{item.name}</h3>
                            </div>
                            <div className="flex justify-center">
                                <p>{item.quiz_count} questions</p>
                            </div>
                            <div className="flex justify-end">
                                <Link className='px-7 py-3 bg-lime-500 hover:bg-lime-400 rounded inline-block w-fit' to={`/play?id=${item.id}`}>
                                    Play
                                </Link>
                            </div>
                        </div>);
                })}


            </div>
            <div className=' flex w-full md:w-[60%] mx-auto my-17 justify-between'>
                <div className='flex justify-center items-center gap-3 '>
                    <button className=' cursor-pointer'>Pre-vious</button>
                    {Array(totalPage).fill(0).map((item, index) => {
                        return (
                            <button onClick={() => setSearchParams({ page: index + 1 })} className=' cursor-pointer' key={index}>{index + 1}</button>
                        )
                    })}

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