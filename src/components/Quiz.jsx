import React, { useState } from 'react';
import Answers from './Answers';
import { quizzes } from '../testData';
import '../index.css';
import { Link } from 'react-router-dom';

const Quiz = () => {
    const [isChoose, setIsChoose] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [correct, setCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [currentQuizID, setCurrentQuizID] = useState(0);
    const currentQuiz = quizzes[currentQuizID];
    const handleQuiz = (index) => {
        setSelectedIndex(index);
        if (currentQuizID < quizzes.length) {
            if (currentQuiz.answers[index].correct) {
                setScore(prev => prev + 1);
                setCorrect(true);
            }
            else {
                setCorrect(false);
            }
            setIsChoose(true);
            
        }
        else {
            console.log('complete');
        }
    }
    const handleNext = () => {
        setCurrentQuizID(prev => prev + 1);
        setIsChoose(false);
        setSelectedIndex(null);
        setCorrect(null);
    }
    const reset = () => {
        setCurrentQuizID(0);
        setIsChoose(false);
        setSelectedIndex(null);
        setCorrect(null);
    }
    return (
        <div>
            <div className=' w-[60%] mx-auto flex flex-col '>
                <div className=' bg-black text-blue-200 px-7 py-5 flex justify-between rounded-t-2xl text-center'>
                <p>Question {currentQuiz ? currentQuiz.id : quizzes.length} of {quizzes.length}</p> 
                    <h3 className=' font-bold '>{currentQuiz ? currentQuiz.question : 'complete'}</h3>
                    
                    <Link to="/" className='hover:text-amber-100'>Cancel</Link>
                </div>
                <Answers length={quizzes.length} score={score} isChoose={isChoose} correct={correct} selectedIndex={selectedIndex} answers={currentQuiz ? currentQuiz.answers : []} onClick={handleQuiz}></Answers>
                <button onClick={handleNext} className={`${isChoose ? '' : 'invisible'} px-7 py-2 rounded cursor-pointer bg-lime-500 mx-auto mt-2 hover:bg-lime-400`}>Next</button>
                <button onClick={reset} className={`${currentQuizID >= quizzes.length ? '' : 'invisible'} px-7 py-2 rounded cursor-pointer bg-lime-500 mx-auto mt-2 hover:bg-lime-400`}>Play again</button>
            </div>
        </div>
    );
};

export default Quiz;