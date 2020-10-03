import React from 'react';
import './AnswersList.css'
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswersList = ({answers, onAnswerClick, state}) => {

  return (
    <ul className='answersList'>
      {answers.map(answer =>
        <AnswerItem
          answer={answer}
          key={answer.id}
          onAnswerClick={onAnswerClick}
          state={state && state[answer.id]}
        />
      )}
    </ul>
  );
};

export default AnswersList;
