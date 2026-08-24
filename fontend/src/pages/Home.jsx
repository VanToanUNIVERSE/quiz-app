import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CollectionList from '../components/Home/CollectionList';
import HomeFooter from '../components/Home/HomeFooter';
import HomeHeader from '../components/Home/HomeHeader';
import Loading from '../components/ui/Loading';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
    const [collections, setCollections] = useState([]);
    const [totalPage, setToTalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/api/collections?page=${page}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setCollections(data.data);
                    setToTalPage(Math.ceil(data.meta.total / 5));
                    setLoading(false);
                }
            })
            .catch(err => console.log('Error: ', err))
    }, [page]);
    return (
        <div className=' h-full w-full absolute p-2 md:p-10 background-image-random text-gray-200'>
            <HomeHeader user={user} setUser={setUser}></HomeHeader>
            {loading ? <Loading></Loading> : <CollectionList collections={collections}></CollectionList>}
            <HomeFooter totalPage={totalPage} setSearchParams={setSearchParams}></HomeFooter>
        </div>
    );
};

export default Home;