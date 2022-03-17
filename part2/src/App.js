import { useState } from "react";

const Button = ({ onclick, text }) => <Button onclick={onclick}>{text}</Button>;

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text} </h1>
    </div>
  );
};
const Statistics = ({ text, value }) => {
  return (
    <div>
      <p>
        {text} {value}
      </p>
      <p>
        {text} {value}
      </p>
      <p>
        {text} {value}
      </p>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
      <Button onclick={handleGood} text="Good" />
      <Button onclick={handleNeutral} text="Neutral" />
      <Button onclick={handleBad} text="Bad" />
      <Statistics text="Good" value={good} />
      <Statistics text="Neutral" value={neutral} />
      <Statistics text="Bad" value={bad} />
    </div>
  );
};
export default App;
