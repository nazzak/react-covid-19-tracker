import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core'
import './App.css';
import InfoBox from './components/InfoBox';
import Map from "./components/Map"
import Table from "./components/Table"
import {prettyPrintStat, sortData} from "./util"
import LineGraph from "./components/LineGraph"
import "leaflet/dist/leaflet.css"

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] =useState("cases")


  //useEffect runs a piece of code based on a condition
  useEffect(() => {

    // The code inside a useEffect runs once when the component loads and not again
    // run a async function 
    const getCountriesData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries")
      const data = await response.json()

      const countries = data.map((item) => (
        {
          name: item.country,
          value: item.countryInfo.iso2,
        }));

        const sortedData = sortData(data);
      setCountries(countries);
      setMapCountries(data);
      setTableData(sortedData)

    };

    getCountriesData()
  }, []);

  //get the first fetch when page loaded
  useEffect(() => {
    onCountryChange(
      {
        target: {
          value: 'worldwide'

        }
      }
    )
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ?
      "https://disease.sh/v3/covid-19/all" :
      // Use revers tick  to inject JS data
      `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

    //get all countries informations
    const info = await fetch(url)
    const data = await info.json();

    setCountryInfo(data)

    //secure the first run for worldwide
    if(countryCode !== 'worldwide')
    {
    setMapCenter([data.countryInfo.lat, data.countryInfo.long])
    setMapZoom(4)
    }
  }

  return (
    <div className="app">
      <div className='app__left'>
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
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
          <InfoBox isRed active={casesType === "cases"} onClick={e => setCasesType('cases')} title="Coronavirus cases" value={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox active={casesType === "recovered"} onClick={e => setCasesType('recovered')} title="Recovered" value={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox isRed active={casesType === "deaths"} onClick={e => setCasesType('deaths')} title="Deaths" value={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
        </div>
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />

      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
