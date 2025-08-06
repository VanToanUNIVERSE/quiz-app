import React, { useEffect, useState } from 'react';
import Answers from './Answers';
import '../index.css';
import { Link } from 'react-router-dom';

const Quiz = (props) => {
    const [collection, setCollection] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/collections/show?id=${props.collectionId}`)
        .then(res => res.json())
        .then(data => {
            setCollection(data.data);
        })
        .catch(err => console.log('Error: ', err));
    }, [props.collectionId]);
    
    
 
    const [isChoose, setIsChoose] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [correct, setCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [currentQuizID, setCurrentQuizID] = useState(0);

    const currentQuiz = collection.quizzes?.[currentQuizID];
    
    const handleQuiz = (index) => {
        setSelectedIndex(index);
        if (currentQuizID < collection.quiz_count) {
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
        setScore(0);
    }
    return (
        <div>
            <div className=' w-[60%] mx-auto flex flex-col p-20    '>
                <div className=' bg-lime-500 px-7 py-5 flex justify-between rounded-t-2xl text-center'>
                <p>Question {currentQuiz ? currentQuiz.id : collection.quiz_count} of {collection.quiz_count}</p> 
                    <h3 className=' font-bold '>{currentQuiz ? currentQuiz.question : 'complete'}</h3>
                    
                    <Link to="/" className='hover:text-amber-100'>Cancel</Link>
                </div>
                <Answers length={collection.quiz_count} score={score} isChoose={isChoose} correct={correct} selectedIndex={selectedIndex} answers={currentQuiz ? currentQuiz.answers : []} onClick={handleQuiz}></Answers>
                <button onClick={handleNext} className={`${isChoose ? '' : 'invisible'} px-7 py-2 rounded cursor-pointer bg-lime-500 mx-auto mt-2 hover:bg-lime-400`}>Next</button>
                <button onClick={reset} className={`${currentQuizID >= collection.quiz_count ? '' : 'invisible'} px-7 py-2 rounded cursor-pointer bg-lime-500 mx-auto mt-2 hover:bg-lime-400`}>Play again</button>
            </div>
        </div>
    );
};

export default Quiz;