import React from 'react';
import './FinishedQuiz.css'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Button from "../Button/Button";
import {Link} from "react-router-dom";


const FinishedQuiz = ({results, quiz, onRetry}) => {

  const correctAnswersNumber = Object.values(results).filter(item => item === 'success').length

  return (
    <div className='finishedQuiz'>
      <ul>
        {
          quiz.map(quizItem =>
          <li
            key={quizItem.id}
          >
            <strong>{quizItem.id}.</strong>
            <p className='finishedQuiz__text'>{quizItem.question}</p>
            {
              results[quizItem.id] === 'success' ? <CheckIcon className='success icon'/> : <ClearIcon className='error icon'/>
            }
          </li>
          )}
      </ul>

      <p className='finishedQuiz__info'>Correct {correctAnswersNumber} out of {quiz.length}</p>

      <div>
        <Button onClick={onRetry} type='primary'>Repeat</Button>
        <Link to='/'><Button type='success'>Go to the quiz list</Button></Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
