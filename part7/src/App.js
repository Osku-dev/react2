import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ handleNewSearch }) => (
  <div>
    filter: <input onChange={handleNewSearch} />{" "}
  </div>
);

const RenderWeather = ({ capital }) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const request = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`;
  const [weather, setWeather] = useState([]);
  const hook = () => {
    axios.get(request).then((response) => {
      setWeather(response.data.current);
    });
  };
  useEffect(hook, []);

  return (
    <div>
      <div>
        <b>temperature:</b> {weather.temperature} ℃{" "}
      </div>
      <img src={weather.weather_icons} alt="weather icon" />
      <div>
        <b>wind:</b> {Math.round(weather.wind_speed / 3.6)} m/s
      </div>
    </div>
  );
};

const Render1 = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <b>Capital: </b>
        {country.capital}
      </div>
      <div>
        <b>Population: </b>
        {country.population}
      </div>

      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map((langKey) => (
          <li key={langKey}>{country.languages[langKey]}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: 250, height: 140 }}
      />
      <h3>Weather in {country.capital}</h3>
      <RenderWeather capital={country.capital} />
    </div>
  );
};

const Render10 = ({ filteredList, setNewSearch }) =>
  filteredList.map((country) => (
    <div key={country.name.common}>
      {country.name.common}
      <button onClick={() => setNewSearch(country.name.common)}> Show </button>
    </div>
  ));

const RenderMaster = ({ filteredList, setNewSearch }) => {
  if (filteredList.length === 1) {
    return <Render1 country={filteredList[0]} />;
  } else if (filteredList.length < 10) {
    return <Render10 filteredList={filteredList} setNewSearch={setNewSearch} />;
  }
  return <div>Too many matches</div>;
};

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

      <RenderMaster filteredList={filteredList} setNewSearch={setNewSearch} />
    </div>
  );
};

export default App;
