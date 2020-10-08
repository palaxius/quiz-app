import React, {useEffect} from 'react';

import './Quiz.css'

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/Loader/LoaderItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../redux/actions/quiz";

const Quiz = () => {
  const dispatch = useDispatch()
  const quiz = useSelector(state => state.quiz.quiz)
  const activeQuestion = useSelector(state => state.quiz.activeQuestion)
  const answerState = useSelector(state => state.quiz.answerState)
  const isFinished = useSelector(state => state.quiz.isFinished)
  const results = useSelector(state => state.quiz.results)
  const loading = useSelector(state => state.quiz.loading)

  useEffect(() => {
    dispatch(fetchQuizById(window.location.pathname.substr(6)))

    return () => {
      dispatch(retryQuiz())
    }
  }, [dispatch])

  const onAnswerClickHandler = (answerId) => {
    dispatch(quizAnswerClick(answerId))
  }

  const retryHandler = () => {
    dispatch(retryQuiz())
  }

  return (
    <div className='quiz'>
      <div className='quiz__wrapper'>
        <h1>Answer all questions</h1>
        {
          loading || !quiz
          ? <Loader />
          : isFinished
            ? <FinishedQuiz
              results={results}
              quiz={quiz}
              onRetry={retryHandler}
            />
            :  <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={onAnswerClickHandler}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
            />
        }
      </div>
    </div>
  );
};

export default Quiz;
