import React from 'react';
import InputGroup from '../ui/InputGroup';
import Answer from './Answer';

const AnswerGroup = ({onChange, quizIndex, answers}) => {
    return (
        <div className=' pl-10 pr-10 mt-3'>
            <div>
                {answers.map((item, index) => {
                    return (
                        <Answer value={item.content} checked={item.correct === 'true' || item.correct === 1} name={quizIndex} onChange={(e) => onChange(e, quizIndex, index)} key={index} label={`Answer ${index + 1}`} for={`answer-${index + 1}`} id={`answer-${index + 1}`} type="text" placeholder={`Enter your answer ${index + 1}`}></Answer>)
                })}
            </div>
        </div>
    );
};

export default AnswerGroup;