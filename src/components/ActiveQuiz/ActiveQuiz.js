import React from 'react';
import './ActiveQuiz.css'
import AnswersList from "../AnswersList/AnswersList";

const ActiveQuiz = ({answers, question, onAnswerClick, quizLength, answerNumber, state}) => {
  return (
    <div className='activeQuiz'>
      <p className='question'>
        <span>
          <strong>{answerNumber}.</strong>&nbsp;
          {question}
        </span>

        <small>{answerNumber} out of {quizLength}</small>
      </p>

    <AnswersList
      answers={answers}
      onAnswerClick={onAnswerClick}
      state={state}
    />
    </div>
  );
};

export default ActiveQuiz;
