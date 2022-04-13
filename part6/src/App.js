import { useState, useEffect } from "react";
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

const Persons = ({ filteredList, deletePerson }) => (
  <div>
    <ul>
      {filteredList.map((person) => (
        <li key={person.id}>
          {" "}
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
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
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const filteredList = persons.filter(({ name }) =>
    name.toLowerCase().includes(newSearch.toLowerCase())
  );

  const addName = (event) => {
    event.preventDefault();
   /* if (persons.some((person) => person.name === newName)) {
      return window.alert(`${newName} is a duplicate`);
    }*/
    

    const nameObject = {
      name: newName,
      id: Math.floor(Math.random() * 9999999),
      number: newNumber,
    };

    if(!persons.some(e => e.name === nameObject.name)) {

    personService.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    setNewName("");
    setNewNumber("");
    }
   else {
  const result = window.confirm(`${nameObject.name} is already in the phonebook. Would you like to update the number?`);
  if (!result) return;
  const updatedNumber = persons.filter(personObject => personObject.name === nameObject.name)
  personService
    .update(updatedNumber[0].id, { ...nameObject, number: newNumber })
    .then(returnedPersons => {
      setNewName('')
      setNewNumber('')
      setPersons(returnedPersons)
   })}};


  const deleteName = ({ id, name }) => {
    const result = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!result) return;
    personService
      .deletePerson(id)
      .then((status) => status !== 200 && window.alert("deletion failed"))
      .then(() => {
        personService.getAll().then((res) => setPersons(res));
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
      <Persons deletePerson={deleteName} filteredList={filteredList} />
    </div>
  );
};

export default App;
