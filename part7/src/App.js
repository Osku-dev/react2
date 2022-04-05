import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ handleNewSearch }) => (
  <div>
    filter: <input onChange={handleNewSearch} />{" "}
  </div>
);

const Persons = ({ filteredList }) => (
  <div>
    <ul>
      {filteredList.map((person) => (
        <li key={person.id}>
          {" "}
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newSearch, setNewSearch] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );
  

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Countries</h2>
      <Filter handleNewSearch={handleNewSearch} />

      <Persons filteredList={filteredList} />
    </div>
  );
};

export default App;
