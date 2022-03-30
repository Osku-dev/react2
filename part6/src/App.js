import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: "050488302381" },
    { name: "Aaro dababada", id: 2, number: "05048842132" },
    { name: "sasasa bgegabada", id: 3, number: "0505123125" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

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

    setPersons(persons.concat(nameObject));

    setNewName("");
    setNewNumber("");
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
      <div>
        filter: <input onChange={handleNewSearch} />{" "}
      </div>
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
      <h2>Numbers</h2>
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
};

export default App;
