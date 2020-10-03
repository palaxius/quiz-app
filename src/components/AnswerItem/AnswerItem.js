import React from 'react';
import './AnswerItem.css'

const AnswerItem = ({answer, onAnswerClick, state}) => {
  return (
    <li
      className={`answerItem ${state && state}`}
      onClick={() => onAnswerClick(answer.id)}
    >
      {answer.text}
    </li>
  );
};

export default AnswerItem;
