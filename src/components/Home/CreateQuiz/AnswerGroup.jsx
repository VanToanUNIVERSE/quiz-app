import React from 'react';
import InputGroup from '../../InputGroup';
import Answer from './Answer';

const AnswerGroup = ({onKeyUp, quizIndex}) => {
    return (
        <div className=' pl-10 pr-10 mt-3'>
            <div>
                {Array(4).fill(0).map((item, index) => {
                    return (
                        <Answer name={quizIndex} onChange={(e) => onKeyUp(e, quizIndex, index)} onKeyUp={(e) => onKeyUp(e, quizIndex, index)} key={index} label={`Answer ${index + 1}`} for={`answer-${index + 1}`} id={`answer-${index + 1}`} type="text" placeholder={`Enter your answer ${index + 1}`}></Answer>)
                })}
            </div>
        </div>
    );
};

export default AnswerGroup;