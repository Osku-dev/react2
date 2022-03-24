import { useState } from "react";

const List = ({ persons }) => {
  return (
    <div>
      <li> {persons.name}</li>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      // id: persons.length + 1,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
  };
  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
          <ul>
            <List persons={persons} />
          </ul>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  );
};

export default App;
