import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CollectionList from '../components/Home/CollectionList';
import HomeFooter from '../components/Home/HomeFooter';
import HomeHeader from '../components/Home/HomeHeader';

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
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
        <div className=' h-full w-full absolute p-2 md:p-10 background-image-random text-gray-200'>
            <HomeHeader user={user} setUser={setUser}></HomeHeader>
            <CollectionList collections={collections}></CollectionList>
            <HomeFooter totalPage={totalPage} setSearchParams={setSearchParams}></HomeFooter>
        </div>
    );
};

export default Home;