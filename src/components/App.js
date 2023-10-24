import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import Finished from './Finished';

const initialState = {
  questions: [],
  status: 'loading',
  currentQuestion: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error('Action Unknown');
    case 'startQuiz':
      return { ...state, status: 'active' };
    case 'newAnswer':
      const question = state.questions.at(state.currentQuestion);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      };
    case 'finish':
      return { ...state, status: 'finished' };
  }
}

export default function App() {
  const [{ questions, status, currentQuestion, answer, points }, dispatch] =
    useReducer(reducer, initialState);

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(function () {
    fetch('http://localhost:9001/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen
            numQuestions={questions.length}
            dispatch={dispatch}
            data={questions}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              i={currentQuestion}
              numQuestion={questions.length}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[currentQuestion]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              i={currentQuestion}
              numQuestion={questions.length}
            />
          </>
        )}
        {status === 'finished' && (
          <Finished points={points} maxPoints={maxPoints} />
        )}
      </Main>
    </div>
  );
}
