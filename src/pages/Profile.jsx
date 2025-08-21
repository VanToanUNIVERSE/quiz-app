import React, { useEffect, useState } from 'react';
import StyledLink from '../components/ui/StyledLink';
import Loading from '../components/ui/Loading';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        if (user === '') {
            return;
        }
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/users/showCollections?userId=${user.id}`).then(res => res.json()).then(data => {
            console.log(data.collections);
            setCollections(data.collections);
            setLoading(false);
        });
    }, [user]);
    if (user === '') {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className='background-image-random p-10 text-gray-200'>
            {loading ? <Loading></Loading> : ''}
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
                                        <StyledLink to={`/edit?id=${item.id}`} name="Edit"></StyledLink>
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