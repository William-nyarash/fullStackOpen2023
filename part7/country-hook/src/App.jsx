import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};


const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;

  useEffect(() => {
    if (!name) return;
    axios
      .get(baseUrl)
      .then((response) => {
      if (response.data && response.data.name) {
          setCountry(response.data);
        } else {
          setCountry(null);
        }
      })
      .catch((error) => {
        setCountry(null); 
      });
  }, [name]); 

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return <div>Not found...</div>; 
  }

  const countryData = country; 
  const countryName = countryData.name.common; 
  return (
    <div>
      <h3>{countryName}</h3> 
      <div>Capital: {countryData.capital}</div>
      <div>Population: {countryData.population}</div>
      <img src={countryData.coatOfArms.png} height="100" alt={`Flag of ${countryName}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name); 
  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value); 
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
