import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ handleNewSearch }) => (
  <div>
    filter: <input onChange={handleNewSearch} />{" "}
  </div>
);

const Render1 = ({ country }) => {
  console.log(country.flags)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div><b>Capital: </b>{country.capital}</div>
      <div><b>Population: </b>{country.population}</div>

      <h3>languages</h3>
      <ul> 
        {Object.keys(country.languages).map(langKey => <li key={langKey}>{country.languages[langKey]}</li>)}
      </ul>

      <img src={country.flags} alt={`Flag of ${country.name.common}`} style={{ width: 250, height: 140 }} />

     
    </div>
  )
}

const Render10 = ({ filteredList }) =>
  filteredList.map((country) => <div key={country.name.common}>{country.name.common}</div>);

  const RenderMaster = ({ filteredList}) => {
    if (filteredList.length === 1) {
      return (<Render1 country={filteredList[0]} />)
    }
    else if (filteredList.length < 10) {
      return (<Render10 filteredList={filteredList} />)
    }
    return (<div>Too many matches</div>)
  }
  
  

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

      <RenderMaster filteredList={filteredList} />
    </div>
  );
};

export default App;
