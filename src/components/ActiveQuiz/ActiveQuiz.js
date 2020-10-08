import React from 'react';
import './ActiveQuiz.css'
import AnswersList from "../AnswersList/AnswersList";

const ActiveQuiz = ({answers, question, onAnswerClick, quizLength, answerNumber, state}) => {
  return (
    <div className='activeQuiz'>
      <p className='question'>
        <span className='question__text'>
          <strong className='question__number'>{answerNumber}.</strong>
          {question}
        </span>

        <small style={{minWidth: '60px'}}>
          {answerNumber} out of {quizLength}
        </small>
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
