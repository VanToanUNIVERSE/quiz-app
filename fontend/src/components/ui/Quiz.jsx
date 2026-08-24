import React, { useEffect, useState } from 'react';
import Answers from './Answers';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const Quiz = (props) => {
    const [loading, setLoading] = useState(false);
    const [collection, setCollection] = useState({});
    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/collections/${props.collectionId}/play`)
            .then(res => res.json())
            .then(data => {
                setCollection(data.data);
                setLoading(false);
            })
            .catch(err => console.log('Error: ', err));
    }, [props.collectionId]);

    const [isChoose, setIsChoose] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentQuizID, setCurrentQuizID] = useState(0);
    const currentQuiz = collection.quizzes?.[currentQuizID];
    const [userAnswers, setUserAnswers] = useState([]);
    const [result, setResult] = useState(null);

    const handleQuiz = (index) => {
        setSelectedIndex(index);
        const chosenAnswer = currentQuiz.answers[index];
        if (currentQuizID < collection.quiz_count) {
            setUserAnswers(prev => [...prev.filter(a => a.quiz_id !== currentQuiz.id), { quiz_id: currentQuiz.id, answer_id: chosenAnswer.id }]);
            setIsChoose(true);
        }
    }

    const handleNext = () => {
        if (currentQuizID === collection.quiz_count - 1) {
            handleSubmit();                       
        }
        setCurrentQuizID(prev => prev + 1);   
        setIsChoose(false);
        setSelectedIndex(null);
    }

    const handleSubmit = () => {
        fetch(`http://127.0.0.1:8000/api/collections/${props.collectionId}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers: userAnswers }),
        })
            .then(res => res.json())
            .then(data => setResult(data))
            .catch(err => console.log('Error: ', err));
    }

    const reset = () => {
        setCurrentQuizID(0);
        setIsChoose(false);
        setSelectedIndex(null);
        setUserAnswers([]);
        setResult(null);
    }
    return (
        <div>
            {loading ? <div className="text-white fixed inset-0 flex justify-center items-center bg-black/40 z-50"><Loading /></div> : (
                <div className=' w-[60%] mx-auto flex flex-col p-20 text-gray-800'>
                    <div className=' bg-lime-500/50  backdrop-blur-sm px-7 py-5 flex justify-between rounded-t-2xl text-center'>
                        <p>Question {currentQuiz ? currentQuizID + 1 : collection.quiz_count} of {collection.quiz_count}</p>
                        <h3 className=' font-bold '>{currentQuiz ? currentQuiz.question : 'complete'}</h3>

                        <Link to="/" className='hover:text-amber-100'>Cancel</Link>
                    </div>
                    <Answers length={result?.total} score={result?.score} isChoose={isChoose} selectedIndex={selectedIndex} answers={currentQuiz ? currentQuiz.answers : []} onClick={handleQuiz}></Answers>
                    <button onClick={handleNext} className={`${isChoose ? '' : 'invisible'} px-7 py-2 rounded cursor-pointer bg-lime-500 mx-auto mt-2 hover:bg-lime-400`}>Next</button>
                    <button onClick={reset} className={`${currentQuizID >= collection.quiz_count ? '' : 'invisible'} px-7 py-2 rounded cursor-pointer bg-lime-500 mx-auto mt-2 hover:bg-lime-400`}>Play again</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;