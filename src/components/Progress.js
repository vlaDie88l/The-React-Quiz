function Progress({ i, numQuestion, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress value={i + Number(answer !== null)} max={numQuestion} />
      <p>
        Question <strong>{i + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
