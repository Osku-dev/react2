import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const AddForm = ({
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
  addName,
}) => (
  <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNewName} />{" "}
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNewNumber} />
    </div>
    <div></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

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
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  const addName = (event) => {
    event.preventDefault();

    const duplicates = persons.filter((person) => person.name === newName);
    if (duplicates.length > 0) return window.alert(`${newName} is a duplicate`);

    const nameObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    personService.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNewSearch={handleNewSearch} />
      <AddForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons filteredList={filteredList} />
    </div>
  );
};

export default App;
