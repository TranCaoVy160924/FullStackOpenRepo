import { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid'
import DisplayResult from './components/Display'
import SearchCountries from './components/SearchCountries';

function App() {
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')

  const hookCountries = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        let result = response.data
          .filter(country => containInsensitive(country.name.common, keyword))
          .map(country => ({
            id: nanoid(),
            name: country.name.common
          }))
        // console.log(result)
        setCountries(result)
      })
  }

  const containInsensitive = (string, subString) =>
    string.trim().toLowerCase()
      .includes(subString.trim().toLowerCase())

  const handleChange = (event) => {
    setKeyword(event.target.value)
  }

  useEffect(hookCountries, [keyword])

  return (
    <>
      <SearchCountries keyword={keyword} handleChange={handleChange} />
      <DisplayResult searchResult={countries} />
    </>
  )
}

export default App;
