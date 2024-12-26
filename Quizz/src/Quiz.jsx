import React, { useState, useEffect } from 'react';
import questionData from './questions.json';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState(10);

    const handleClickAnswer = (option) => {
        if (option === questionData[currentQuestion].correctedOptions) {
            setScore((prevScore) => prevScore + 1);
            
        }
        if (currentQuestion < questionData.length - 1) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            setTimer(10);
        }
        else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimer(10);
    };

    useEffect(() => {
        let interval;
        if (timer > 0 && !showScore) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setShowScore(true);
        }
        return () => clearInterval(interval);
    }, [timer, showScore]);
    return (
        <div className='quiz-app'>
            {showScore ? (
                <div className='score'>
                    <h2>Your Score: {score} / {questionData.length}</h2>
                    <button onClick={restartQuiz}>Restart</button>
                </div>
            ) : (
                <div className='quiz'>
                    <h2>Question: {currentQuestion + 1}</h2>
                    <p>{questionData[currentQuestion].question}</p>
                    <div className='btn'>
                        {questionData[currentQuestion].options.map((option, index) => (
                            <button key={index} onClick={() => handleClickAnswer(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className='timer'>Time Left: <span>{timer}s</span></div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
