import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text} </h1>
    </div>
  );
};
const StatisticsLine = ({ text, value }) => {
  return (
    <div>
      <p>
        {text} {value}
      </p>
    </div>
  );
};

const Statistics = ({ stats }) => {
  if (stats.all !== 0) {
    return (
      <div>
        <StatisticsLine text="good" value={stats.good} />
        <StatisticsLine text="neutral" value={stats.neutral} />
        <StatisticsLine text="bad" value={stats.bad} />
        <StatisticsLine text="all" value={stats.all} />
        <StatisticsLine text="average" value={stats.average} />
        <StatisticsLine text="positivePercent" value={stats.positivePercent} />
      </div>
    );
  }
  return <></>;
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: (good - bad) / all,
    positivePercent: (good / all) * 100 + "%",
  };

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="Give feedback" />
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Header text="Statistics" />
      <Statistics stats={stats} />
    </div>
  );
};
export default App;
