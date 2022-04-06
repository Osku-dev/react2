import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ handleNewSearch }) => (
  <div>
    filter: <input onChange={handleNewSearch} />{" "}
  </div>
);

const Render10 = ({ filteredList }) =>
  filteredList.map((country) => <div key={country.name.common}>{country.name.common}</div>);

const App = () => {
  const [countries, setCountries] = useState([]);

  const [newSearch, setNewSearch] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredList =
    newSearch === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(newSearch.toLowerCase())
        );

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Countries</h2>
      <Filter handleNewSearch={handleNewSearch} />

      <Render10 filteredList={filteredList} />
    </div>
  );
};

export default App;
