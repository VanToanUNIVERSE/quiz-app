import React, { useEffect, useState } from 'react';
import StyledLink from '../components/ui/StyledLink';
import Loading from '../components/ui/Loading';
import { Navigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Confirm from '../components/ui/Confirm';
import Message from '../components/ui/Message';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [confirm, setCofirm] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');
    const [collections, setCollections] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (user === '') {
            return;
        }
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/api/users/showCollections`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            }
        ).then(res => res.json()).then(data => {
            console.log(data.collections);
            setCollections(data.collections);
            setLoading(false);
        });
    }, [user]);
    if (user === '') {
        return <Navigate to="/login" replace />;
    }
    const showConfirm = (id) => {
        setCofirm(id);
    }
    const deleteCollection = (id) => {
        setLoading(true);
        setCofirm(null);
        fetch(`${import.meta.env.VITE_API_URL}/api/collections/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setResponseMessage(data.message);
                setCollections(prev => prev.filter(item => item.id !== id));
                setLoading(false);
            }).catch(err => {
                setResponseMessage(err);
                setLoading(false);
            });
    }
    return (
        <div className='background-image-random p-10 text-gray-200'>
            {loading ? <Loading></Loading> : ''}
            {confirm ? <Confirm yes={() => deleteCollection(confirm)} cancel={() => showConfirm(null)}></Confirm> : ''}
            <Message visible={responseMessage != '' ? '' : 'invisible'} message={responseMessage} to={`/profile`} onClick={() => setResponseMessage('')}></Message>

            <StyledLink name="Back" to="/"></StyledLink>
            <h2>Your collections: </h2>
            <table className='table-auto w-full md:w-[50%] border-collapse shadow backdrop-blur-2xl'>
                <thead>
                    <tr>
                        <th className="p-4 text-left">Quiz name</th>
                        <th className="p-4 text-center" colSpan='2'>Action</th>
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
                                    <td>
                                        <Button name="Delete" color='bg-red-500' hover='bg-red-400' onClick={() => showConfirm(item.id)}></Button>
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