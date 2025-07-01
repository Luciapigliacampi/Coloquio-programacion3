import React, { useState } from 'react';

const QuestionInput = ({ question, onQuestionChange, onSubmit, loading }) => {
  return (
    <div className="question-input-container">
      <input
        type="text"
        className="question-input"
        placeholder="Escribí tu pregunta acá"
        value={question}
        onChange={onQuestionChange}
        disabled={loading}
      />
      <button
        className="submit-button"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? 'Pensando...' : 'Preguntar'}
      </button>
    </div>
  );
};

export default QuestionInput; 