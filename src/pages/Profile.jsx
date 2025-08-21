import React, { useEffect, useState } from 'react';
import StyledLink from '../components/ui/StyledLink';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        if (user === '') {
            return;
        }
        fetch(`http://127.0.0.1:8000/api/users/showCollections?userId=${user.id}`).then(res => res.json()).then(data => {
            console.log(data.collections);
            setCollections(data.collections);
        });
    }, [user]);
    if (user === '') {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className='background-image-random p-10 text-gray-200'>
            <StyledLink name="Back" to="/"></StyledLink>
            <h2>Your collections: </h2>
            <table className='table-auto w-full md:w-[50%] border-collapse shadow backdrop-blur-2xl'>
                <thead>
                    <tr>
                        <th className="p-4 text-left">Quiz name</th>
                        <th className="p-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.length === 0 ? (<tr><td><h1>No collections found</h1></td></tr>) : (
                        collections.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td className="p-4 text-left">{item.name}</td>
                                    <td className="p-4 text-center">
                                        <button className="px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            )

                        })
                    )
                    }

                </tbody>

            </table>
        </div>
    );
};

export default Profile;