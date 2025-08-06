import React from 'react';
import InputGroup from '../../InputGroup';
import AnswerGroup from './AnswerGroup';

const SetQuiz = () => {
    return (
        <fieldset className=' border-1 border-blue-400 p-5 relative mt-3 rounded shadow-md shadow-blue-300'>
            <button className='chevron chevron-down text-2xl absolute right-4 top-0 cursor-pointer'></button>
            <legend>Quiz 1</legend>
            <InputGroup label="Question" for="question" id="question" type="text" placeholder="Enter your question"></InputGroup>
            <AnswerGroup></AnswerGroup>
        </fieldset>
    );
};

export default SetQuiz;