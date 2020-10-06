import React, {useEffect, useState} from 'react';
import './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/Loader/LoaderItem";

const Quiz = () => {
  const [quiz, setQuiz] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answerState, setAnswerState] = useState(null)
  const [isFinished, setIsFinished] = useState(false)
  const [results, setResults] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function fetchQuiz() {
      setIsLoaded(false)
      const response = await axios.get(`quizzes/${window.location.pathname.substr(6)}.json`)
      const newQuiz = response.data

      setQuiz(newQuiz)
      setIsLoaded(true)
    }
    fetchQuiz()
  }, [])

  const onAnswerClickHandler = (answerId) => {
    if (answerState) {
      const key = Object.keys(answerState)[0]
      if (answerState[key] === 'success') {
        return
      }
    }
    const question = quiz[activeQuestion]
    if (question.rightAnswerId === answerId) {
      if (!results[answerId]) {
        if (!results[question.id]) {
          results[question.id] = 'success'
          setResults(results)
        }
      }
      setAnswerState({[answerId]: 'success'})
      setTimeout(() => {
        if (activeQuestion + 1 === quiz.length) {
          setIsFinished(true)
        } else {
          setActiveQuestion(activeQuestion + 1)
          setAnswerState(null)
        }
      }, 1000)

    } else {
      results[question.id] = 'error'
      setAnswerState({[answerId]: 'error'})
      setResults(results)
    }
  }

  const retryHandler = () => {
    setIsFinished(false)
    setResults({})
    setActiveQuestion(0)
    setAnswerState(null)
  }

  return (
    <div className='quiz'>
      <div className='quiz__wrapper'>
        <h1>Answer all questions</h1>

        {
          !isLoaded
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
