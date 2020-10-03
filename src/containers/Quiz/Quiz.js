import React, {useState} from 'react';
import './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

const Quiz = () => {
  const [quiz, setQuiz] = useState([
    {
      results: {},
      question: 'What color is the sky?',
      id: 1,
      rightAnswerId: 2,
      answers: [
        {text: 'Red', id: 1},
        {text: 'Blue', id: 2},
        {text: 'Yellow', id: 3},
        {text: 'Green', id: 4},
      ]
    },
    {
      question: 'In what year was St. Petersburg founded?',
      id: 2,
      rightAnswerId: 3,
      answers: [
        {text: '1700', id: 1},
        {text: '1702', id: 2},
        {text: '1703', id: 3},
        {text: '1701', id: 4},
      ]
    },
  ])

  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answerState, setAnswerState] = useState(null)
  const [isFinished, setIsFinished] = useState(true)
  const [results, setResults] = useState({})


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
          isFinished
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
