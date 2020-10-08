import React, {useEffect} from 'react';

import './QuizList.css'

import {NavLink} from "react-router-dom";
import Loader from "../../components/Loader/LoaderItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchQuizzes} from "../../redux/actions/quiz";

const QuizList = () => {
  const dispatch = useDispatch()
  const quiz = useSelector(state => state.quiz)

  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [dispatch])

  const renderQuizzes = () => {
    return quiz.quizzes.map(quiz => (
      <li
        key={quiz.id}
      >
        <NavLink to={'/quiz/' + quiz.id}>
          {quiz.name}
        </NavLink>
      </li>
      )
    )
  }

  return (
    <div className='quizList'>
      <div>
        <h1>Quiz List</h1>
        <ul>
          {quiz.loading && quiz.quizzes !== 0 ? <Loader /> : renderQuizzes()}
        </ul>
      </div>
    </div>
  );
};

export default QuizList;
