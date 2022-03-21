import { useState } from "react";

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text} </button>
);

const ShowAnecdote = ({ text, vote }) => {
  return (
    <div>
      {text} {vote}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const max = Math.max.apply(Math, points);

  const addVote = () => {
    const pointCopy = [...points];
    pointCopy[selected] += 1;
    setPoints(pointCopy);
  };

  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * 6));
  };

  

  return (
    <div>
      <ShowAnecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button onClick={handleSelected} text="random anecdote" />
      <Button onClick={addVote} text="vote" />
      <ShowAnecdote text={anecdotes[points.indexOf(max)]} votes={max} />
    </div>
  );
};

export default App;
