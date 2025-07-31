import React, { useState } from 'react';
import Answers from './Answers';
import { quizzes } from '../testData';
import '../index.css';

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
            setIsChoose(true);
            setCorrect(false);
        }
        else {
            console.log('complete');
        }
    }
    const handleNext = () => {
        setCurrentQuizID(prev => prev + 1);
        setIsChoose(false);
    }
    return (
        <div>
            <div className=' w-[60%] mx-auto flex flex-col '>
                <div className=' bg-black text-blue-200 px-7 py-5 flex justify-between rounded-t-2xl'>
                    <h3>{currentQuiz ? currentQuiz.question : 'complete'}</h3>
                    <p>Question {currentQuiz ? currentQuiz.id : quizzes.length} of {quizzes.length}</p>
                </div>
                <Answers correct={correct} selectedIndex={selectedIndex} answers={currentQuiz ? currentQuiz.answers : []} onClick={handleQuiz}></Answers>
                <button onClick={handleNext} className={`${isChoose ? '' : 'invisible'} px-7 py-2 rounded cursor-pointer bg-lime-500 mx-auto mt-2 hover:bg-lime-400`}>Next</button>
            </div>
        </div>
    );
};

export default Quiz;