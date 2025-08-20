import React, { useEffect, useState } from 'react';
import InputGroup from '../ui/InputGroup';
import AnswerGroup from './AnswerGroup';

const SetQuiz = ({ handleCurrentQuestion, currentQuestion, onChange, quizIndex, answers, collapseInput, deleteQuiz }) => {
    const [collapse, setCollapse] = useState(false);

    useEffect(() => {
        setCollapse(collapseInput);
    }, [collapseInput]);

    const handleCollapse = (e) => {
        e.preventDefault();
        setCollapse(!collapse);
    }
    return (
        <fieldset className=' border-1 border-blue-400 p-5 relative mt-3 rounded shadow-md shadow-blue-300'>
            <button onClick={handleCollapse} className='chevron chevron-down text-2xl absolute right-4 top-0 cursor-pointer'></button>
            <button onClick={() => deleteQuiz(quizIndex)} className='m-3 px-2 py-1 text-gray-200 bg-red-500 hover:bg-red-400 rounded cursor-pointer absolute -top-5 -right-25'>Delete</button>
            <legend>Quiz {quizIndex + 1}</legend>
            <h3 className={` font-bold transition-all duration-300 ${collapse ? ' translate-0' : ' translate-x-48'}`}>{collapse ? currentQuestion : ''}</h3>
            <div className={` transition-all duration-300 overflow-hidden ${collapse ? ' max-h-0' : ' max-h-[1000px]'}`}>
                <InputGroup value={currentQuestion} onChange={handleCurrentQuestion} label="Question" for="question" id="question" type="text" required={true}></InputGroup>
                <AnswerGroup answers={answers} onChange={onChange} quizIndex={quizIndex}></AnswerGroup>
            </div>
        </fieldset>
    );
};

export default SetQuiz;