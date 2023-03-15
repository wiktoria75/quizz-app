import React, { useState } from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './QuizModal.css';
import Score from './Score';

function QuizModal(props) {
    const { quiz, setVisible } = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState([]);
    const [disableBtn, setDisableBtn] = useState(true)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
    const [showScore, setShowScore] = useState(false)
    const [points, setPoints] = useState(0);

    // Array of buttons to represent the progress
    const progress = [...Array(quiz.questions.length).keys()];


    function handleNextQuestion() {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setDisableBtn(!disableBtn)
        setSelectedAnswerIndex(-1)
    }

    function checkAnswer(answer, answerIndex) {
        setScore(score.concat(answer.isCorrect))
        console.log(score)
        setDisableBtn(!disableBtn)
        setSelectedAnswerIndex(answerIndex);

    }

    function getFinalScore() {
        setShowScore(true)
        const resoult = score.filter(el => el === true)
        console.log(resoult.length)
        setPoints(resoult.length)
    }

    function handleCloseScore() {
        setShowScore(false)
    }

    function closeSummary(flag) {
        setShowScore(flag)
        setVisible(true)
    }

    return (
        <div>
            {quiz.questions.map((question, index) => (
                index === currentQuestionIndex && (
                    <div key={index}>
                        <h2>{question.question}</h2>
                        <div>
                            {question.answers.map((answer, answerIndex) => (
                                <button className={
                                    selectedAnswerIndex === answerIndex ? answer.isCorrect ? 'correct' : 'incorrect' : (answer.isCorrect ? 'correct' : '')
                                } key={answerIndex} onClick={() => checkAnswer(answer, answerIndex)} disabled={!disableBtn} >{answer.question}</button>

                            ))}
                        </div>
                        {currentQuestionIndex < quiz.questions.length - 1
                            ? (
                                <>
                                    <button className='next-btn' onClick={handleNextQuestion} disabled={disableBtn}>Next</button>
                                    {progress.map((p, i) => (
                                        <button key={i} className="progress-btn" disabled={i > currentQuestionIndex}>{p + 1}</button>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <button onClick={() => { getFinalScore() }} disabled={disableBtn}>Close</button>
                                    {progress.map((p, i) => (
                                        <button key={i} className="progress-btn" disabled={i > currentQuestionIndex}>{p + 1}</button>
                                    ))}
                                </>
                            )
                        }
                    </div>
                )
            ))}
            {showScore && (
                <Score score={points} onClose={handleCloseScore} setVisible={setVisible} isOpen={showScore} closeSummary={closeSummary} />
            )}
        </div>
    );
}   

export default QuizModal;