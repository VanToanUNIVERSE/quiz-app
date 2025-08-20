import React from 'react';
import '../index.css';
import Quiz from '../components/ui/Quiz';
import { useSearchParams } from 'react-router-dom';


const Play = () => {
    const [searchParams] = useSearchParams();
    const collectionId = searchParams.get('id');
    
    return (
        <Quiz collectionId={collectionId}></Quiz>
    );
};

export default Play;