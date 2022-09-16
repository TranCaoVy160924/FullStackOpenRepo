import { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayResult from './components/Display'
import SearchCountries from './components/SearchCountries';

function App() {
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')

  const hookCountries = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  const handleChange = (event) => {
    setKeyword(event.target.value)
  }

  useEffect(hookCountries, [])

  return (
    <>
      <SearchCountries keyword={keyword} handleChange={handleChange} />
      <DisplayResult countries={countries} keyword={keyword} />
    </>
  )
}

export default App;
