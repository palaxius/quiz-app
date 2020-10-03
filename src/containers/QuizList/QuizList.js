import React from 'react';
import './QuizList.css'
import {NavLink} from "react-router-dom";

const QuizList = () => {
  const renderQuizzes = () => {
    return [1, 2, 3].map((quiz, index) => (
      <li
        key={index}
      >
        <NavLink to={'/quiz/' + quiz}>
          Quiz {quiz}
        </NavLink>
      </li>
    ))
  }

  return (
    <div className='quizList'>
      <div>
        <h1>Quiz List</h1>

        <ul>
          {renderQuizzes()}
        </ul>
      </div>
    </div>
  );
};

export default QuizList;
