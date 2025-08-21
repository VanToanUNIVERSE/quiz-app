import React, { useState } from 'react';
import '../index.css';
import Quiz from '../components/ui/Quiz';
import { useSearchParams } from 'react-router-dom';


const Play = () => {
    const [searchParams] = useSearchParams();
    const collectionId = searchParams.get('id');
    
    return (
        <div className='background-image-random min-w-full min-h-full'>
            <Quiz collectionId={collectionId}></Quiz>
        </div>
        
    );
};

export default Play;