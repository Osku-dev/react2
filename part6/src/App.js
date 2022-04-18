import { useState, useEffect } from "react";
import personService from "./services/persons";

const Notification = ({ message, errorMessage }) => {
  if (message !== null) {
    return <div className="success">{message}</div>;
  }
  if (errorMessage !== null) {
    return <div className="error">{errorMessage}</div>;
  } else {
    return null;
  }
};
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
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    setNewName("");
    setNewNumber("");

    if (!persons.some((e) => e.name === nameObject.name)) {
      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        setMessage(`Number added`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
      return;
    }
    const result = window.confirm(
      `${nameObject.name} is already in the phonebook. Would you like to update the number?`
    );

    if (!result) return;

    const updatedNumber = persons.find(
      (personObject) => personObject.name === nameObject.name
    );

    const newPersons = persons.filter(
      (person) => person.id !== updatedNumber.id
    );

    personService
      .update(updatedNumber.id, nameObject)

      .then((returnedPersons) => {
        setPersons([...newPersons, returnedPersons]);

        setMessage(`Number updated`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage(
          `${nameObject.name} has already been removed from the server.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    setNewName("");
    setNewNumber("");
  };

  const deleteName = ({ id, name }) => {
    const result = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!result) return;
    personService
      .deletePerson(id)
      .then((status) => status !== 200 && window.alert("deletion failed"))
      .then(() => {
        personService.getAll().then((res) => setPersons(res));

        setMessage(`Number deleted`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
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
      <Notification message={message} errorMessage={errorMessage} />
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
