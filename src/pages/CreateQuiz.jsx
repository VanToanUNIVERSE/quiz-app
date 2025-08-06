import React, { useState } from 'react';
import InputGroup from '../components/InputGroup';
import SetQuiz from '../components/Home/CreateQuiz/SetQuiz';

const CreateQuiz = () => {


    const [collection, setCollection] = useState({
        name: '',
        quizzes: [{ id: Date.now(), question: '' }]
    });
    const handleCurrentQuestion = (e, index) => {
        const updatedQuizzes = [...collection.quizzes];
        updatedQuizzes[index].question = e.target.value;

        setCollection({
            ...collection,
            quizzes: updatedQuizzes
        });
    };

    const addQuiz = (e) => {
        e.preventDefault();
        const oldQuizzes = [...collection.quizzes];
        setCollection({
            ...collection,
            quizzes: [...oldQuizzes, {id: Date.now(), question: ''}]
        });

    }
    return (
        <div className='p-10'>
            <h2>Create Your Quiz</h2>
            <form className='w-[70%]'>
                <InputGroup label="Collection name" for="collection-name" id="collection-name" type="text" placeholder="Enter your collection name"></InputGroup>
                {collection.quizzes.map((item, index) => {
                    return (
                        <SetQuiz key={item.id} handleCurrentQuestion={(e) => handleCurrentQuestion(e, index)} currentQuestion={item.question}></SetQuiz>
                    );
                })}
                
                <button onClick={addQuiz} className=' m-3 px-2 py-1 text-gray-200 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>More Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuiz;