import React, {useEffect, useState} from 'react';
import './QuizList.css'
import {NavLink} from "react-router-dom";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/Loader/LoaderItem";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([])
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    async function fetchQuizzes() {
      setIsLoaded(false)
      const updatedQuizzes = []
      await axios.get('quizzes.json').then(response => {
        Object.keys(response.data).forEach((key, index) => {
          updatedQuizzes.push({
            id: key,
            name: `Quiz №${index + 1}`
          })
        })

        setQuizzes(updatedQuizzes)
        setIsLoaded(true)
      })
    }

    fetchQuizzes()
  }, [])

  const renderQuizzes = () => {
    return quizzes.map(quiz => (
      <li
        key={quiz.id}
      >
        <NavLink to={'/quiz/' + quiz.id}>
          {quiz.name}
        </NavLink>
      </li>
    ))
  }

  return (
    <div className='quizList'>
      <div>
        <h1>Quiz List</h1>
        <ul>
          {!isLoaded ? <Loader /> : renderQuizzes()}
        </ul>
      </div>
    </div>
  );
};

export default QuizList;
