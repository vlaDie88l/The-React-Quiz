function Finished({ points, maxPoints }) {
  const percentage = Math.round((points / maxPoints) * 100);
  return (
    <p className="result">
      You scored <strong>{points}</strong> points out of{' '}
      <strong>{maxPoints}</strong> possible points.
      <br /> That's {percentage}%!
    </p>
  );
}

export default Finished;
