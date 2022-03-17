import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const DisplayAnecdote = ({ text, votes }) => (
  <div>
    {text}
    <br></br>
    {votes}
  </div>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const newAnecdote = () => {
    setSelected(Math.floor(Math.random() * 6));
  };
  const max = Math.max.apply(Math, points);

  const addVote = () => {
    const pointCopy = [...points];
    pointCopy[selected] += 1;
    setPoints(pointCopy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote
        text={props.anecdotes[selected]}
        votes={points[selected]}
      />
      <Button onClick={newAnecdote} text="generate new anecdote" />
      <Button onClick={addVote} text="addVote" />
      <h1>Most voted</h1>
      <DisplayAnecdote
        text={props.anecdotes[points.indexOf(max)]}
        votes={max}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
