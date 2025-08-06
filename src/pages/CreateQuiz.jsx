import React from 'react';
import InputGroup from '../components/InputGroup';
import SetQuiz from '../components/Home/CreateQuiz/SetQuiz';

const CreateQuiz = () => {
    return (
        <div className='p-10'>
            <h2>Create Your Quiz</h2>
            <form className='w-[70%]'>
                <InputGroup label="Collection name" for="collection-name" id="collection-name" type="text" placeholder="Enter your collection name"></InputGroup>
                <SetQuiz></SetQuiz>
                <button className=' m-3 px-2 py-1 text-gray-200 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>More Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuiz;