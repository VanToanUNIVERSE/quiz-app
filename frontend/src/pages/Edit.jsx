import React, { useEffect, useState } from 'react';
import InputGroup from '../components/ui/InputGroup';
import SetQuiz from '../components/CreateQuiz/SetQuiz';
import { Link, useSearchParams } from 'react-router-dom';
import Loading from '../components/ui/Loading';
import Message from '../components/ui/Message';

const Edit = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ status: '', message: '' });

    const [searchParams] = useSearchParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');
    const [openedIndex, setOpenedIndex] = useState(0);
    const savedCollection = JSON.parse(localStorage.getItem("collection"));
    const id = searchParams.get('id');
    const initital = {
        name: '',
        quizzes: [
            {
                id: Date.now(),
                question: '',
                answers: [
                    {
                        content: '', correct: ''
                    },
                    {
                        content: '', correct: ''
                    },
                    {
                        content: '', correct: ''
                    },
                    {
                        content: '', correct: ''
                    }
                ]
            }
        ]
    }
    const [collection, setCollection] = useState(savedCollection || initital);
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!savedCollection) {
            setLoading(true);
            fetch(`${import.meta.env.VITE_API_URL}/api/collections/${id}`)
                .then(res => res.json())
                .then(data => {
                    setCollection({
                        name: data.data.name || "",
                        quizzes: (data.data.quizzes || []).map(quiz => ({
                            ...quiz,
                            answers: quiz.answers.map(answer => ({
                                ...answer,
                                correct: answer.correct == 1 ? "true" : "false"   // số → chuỗi
                            }))
                        }))
                    });

                    setLoading(false);
                })
                .catch(err => console.log('Error when fetch: ', err));
        }
    }, [id, savedCollection]);
    useEffect(() => {
        localStorage.setItem('collection', JSON.stringify(collection));
    }, [collection]);
    const handleNameChange = (e) => {
        setCollection({ ...collection, name: e.target.value })
    }
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
            quizzes: [...oldQuizzes, {
                id: Date.now(), question: '', answers: [
                    { content: '', correct: '' },
                    { content: '', correct: '' },
                    { content: '', correct: '' },
                    { content: '', correct: '' }
                ]
            }]
        });
        setOpenedIndex(oldQuizzes.length);
    }
    const deleteQuiz = (index) => {
        const updatedQuizzes = collection.quizzes.filter((_, i) => i !== index);
        setCollection({ ...collection, quizzes: updatedQuizzes });
    }
    const handleChangeAnswer = (e, quizIndex, answerIndex) => {
        const updatedQuizzes = [...collection.quizzes];
        if (e.target.type === 'radio') {
            updatedQuizzes[quizIndex].answers.forEach((answer, idx) => {
                answer.correct = idx === answerIndex ? 'true' : 'false';
            });
        } else {
            updatedQuizzes[quizIndex].answers[answerIndex].content = e.target.value;
        }

        setCollection({
            ...collection,
            quizzes: updatedQuizzes
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/api/collections/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                collection: collection,
                userId: user.id,
                collectionId: id
            })
        })
            .then(res => res.json())
            .then(data => {
                setResponse({
                    status: data.status,
                    message: data.message,
                });
                setLoading(false);
            })
            .catch(err => console.log('Error: ', err));
    }
    console.log(collection);
    return (
        <div className='p-10 background-image-random text-white'>
            {loading ? <Loading></Loading> : ''}
            <h2>Create Your Quiz</h2> <Link to="/profile" type='submit' className=' m-3 px-2 py-1 text-gray-200 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer absolute top-0 right-0'><button onClick={() => localStorage.removeItem("collection")}>Back</button></Link>
            <form className='w-[70%]' onSubmit={handleSubmit}>
                <InputGroup value={collection.name} onChange={handleNameChange} label="Collection name" for="collection-name" id="collection-name" type="text" required={true}></InputGroup>
                {collection.quizzes.map((item, index) => {
                    return (
                        <SetQuiz answers={item.answers} deleteQuiz={deleteQuiz} collapseInput={openedIndex !== index} onChange={handleChangeAnswer} quizIndex={index} key={item.id} handleCurrentQuestion={(e) => handleCurrentQuestion(e, index)} currentQuestion={item.question}></SetQuiz>
                    );
                })}
                <button onClick={addQuiz} className=' m-3 px-2 py-1 text-gray-200 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>More Quiz</button>
                <button type='submit' className=' m-3 px-2 py-1 text-gray-200 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer'>Save</button>
            </form>
            <Message visible={response.message != '' ? '' : 'invisible'} message={response.message} to={`/edit?id=${id}`} onClick={() => setResponse({ status: false, message: '' })}></Message>

        </div>
    );
};

export default Edit;