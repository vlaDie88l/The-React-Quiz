function NextButton({ dispatch, answer, i, numQuestion }) {
  if (answer === null) return null;
  if (i < numQuestion - 1) {
    const moveNext = { type: 'nextQuestion' };
    return (
      <button className="btn btn-ui" onClick={() => dispatch(moveNext)}>
        Next
      </button>
    );
  }

  if (i === numQuestion - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finish' })}
      >
        Get Results
      </button>
    );
  }
}

export default NextButton;
