import React from 'react';

const AnswerDisplay = ({ answer, imageUrl }) => {
  if (!answer) {
    return null;
  }

  return (
    <div className="answer-container">
      <h2 className={`answer-text answer-${answer.toLowerCase()}`}>
        {answer.toUpperCase()}
      </h2>
      <img src={imageUrl} alt={answer} className="answer-gif" />
    </div>
  );
};

export default AnswerDisplay;