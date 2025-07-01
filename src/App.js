import React, { useState } from 'react';
import axios from 'axios';
import QuestionInput from './QuestionInput';
import AnswerDisplay from './AnswerDisplay';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Valida si la pregunta es correcta
  const preguntaValida = (q) => {
    const ambosSignos = q.startsWith('¿') && q.endsWith('?');
    const ultimoSigno = q.endsWith('?');
    return ambosSignos || ultimoSigno;
  };

  // Cuando el usuario escribe en el input
  const ingresaPregunta = (e) => {
    setQuestion(e.target.value);
    setError('');
  };

  // Cuando el usuario hace clic en preguntar
  const handleSubmit = async () => {
    if (!question.trim()) {
      setError('Escriba una pregunta.');
      setAnswer(null);
      setImageUrl('');
      return;
    }

    // Valida el formato de la pregunta
    if (!preguntaValida(question)) {
      setError('La pregunta debe empezar con "¿" y terminar con "?" o solo terminar con "?".');
      setAnswer(null);
      setImageUrl('');
      return;
    }

    setLoading(true);
    setAnswer(null);
    setImageUrl('');
    setError('');

    try {
      // Petición a la API
      const response = await axios.get('https://yesno.wtf/api');
      console.log(response.data);
      setAnswer(response.data.answer); 
      setImageUrl(response.data.image);
    } catch (err) {
      console.error("Error al consultar la API:", err);
      setError('Hubo un error al consultar la API. Por favor, inténtalo de nuevo.');
      setAnswer(null);
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>¿Si o no?</h1>
      <p className="description">Haz una pregunta que se responda con sí o no, y te daré la respuesta.</p>

      <QuestionInput
        question={question}
        onQuestionChange={ingresaPregunta}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {error && <p className="error-message">{error}</p>}

      {loading && !error && <p className="loading-message">Pensando en tu respuesta...</p>}

      <AnswerDisplay answer={answer} imageUrl={imageUrl} />
    </div>
  );
}

export default App;