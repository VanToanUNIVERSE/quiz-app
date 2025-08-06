import React, { useState } from 'react';
import InputGroup from '../../InputGroup';
import AnswerGroup from './AnswerGroup';

const SetQuiz = ({handleCurrentQuestion, currentQuestion, onKeyUp, quizIndex}) => {
    const [collapse, setCollapse] = useState(false);
    
    const handleCollapse = (e) => {
        e.preventDefault();
        setCollapse(!collapse);
    }
    return (
        <fieldset className=' border-1 border-blue-400 p-5 relative mt-3 rounded shadow-md shadow-blue-300'>
            <button onClick={handleCollapse} className='chevron chevron-down text-2xl absolute right-4 top-0 cursor-pointer'></button>
            <legend>Quiz 1</legend>
            <h3 className={` font-bold transition-all duration-300 ${collapse ? ' translate-0' : ' translate-x-48'}`}>{collapse ? currentQuestion : ''}</h3>
            <div className={` transition-all duration-300 overflow-hidden ${collapse ? ' max-h-0' : ' max-h-[1000px]'}`}>
                <InputGroup onKeyUp={handleCurrentQuestion} label="Question" for="question" id="question" type="text" placeholder="Enter your question"></InputGroup>
                <AnswerGroup onKeyUp={onKeyUp} quizIndex={quizIndex}></AnswerGroup>
            </div>
        </fieldset>
    );
};

export default SetQuiz;