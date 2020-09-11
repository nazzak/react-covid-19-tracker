import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core'
import './App.css';
import InfoBox from './components/InfoBox';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState(
    {
      cases: "",
      todayCases: "",
      deaths: "",
      todayDeaths: "",
      recovered: "",
      todayRecovered: "",
    }
  )


  //useEffect runs a piece of code based on a condition
  useEffect(() => {

    // The code inside a useEffect runs once when the component loads and not again
    // run a async function 
    const getCountriesData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries")
      const data = await response.json()
      console.log('YOOOO >>>>', data)

      const countries = data.map((item) => (
        {
          name: item.country,
          value: item.countryInfo.iso2,
        }));
      setCountries(countries);

    };

    getCountriesData()
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    //get all countries informations
    const countryInfo = await fetch("https://disease.sh/v3/covid-19/countries/" + countryCode + "?strict=true")
    const countryInfoJson = await countryInfo.json();

    setCountryInfo(
      {
        cases: countryInfoJson.cases,
        todayCases: countryInfoJson.todayCases,
        deaths: countryInfoJson.deaths,
        todayDeaths: countryInfoJson.todayDeaths,
        recovered: countryInfoJson.recovered,
        todayRecovered: countryInfoJson.todayRecovered,
      }
    )


  }

  return (
    <div className="app">

      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus cases" value={countryInfo.todayCases} total={countryInfo.cases} />
        <InfoBox title="Recovered" value={countryInfo.todayRecovered} total={countryInfo.recovered} />
        <InfoBox title="Deaths" value={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>





      {/* Header */}


      {/*  */}

      {/* InfoBox*/}
      {/* InfoBox */}
      {/* InfoBox */}

      {/* Table */}
      {/* Graph */}

      {/* Map : stopped at 1.45
      https://www.youtube.com/watch?v=cF3pIMJUZxM&t=1291s
      */}
      
    </div>
  );
}

export default App;
