import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayResult = ({ countries, keyword }) => {
    let display
    let searchResult
    const [renderCountry, setRenderCountry] = useState(null)

    const containInsensitive = (string, subString) =>
        string.trim().toLowerCase()
            .includes(subString.trim().toLowerCase())

    searchResult = countries
        .filter(country => containInsensitive(country.name.common, keyword))

    if (searchResult.length > 10) {
        display = <ErrorMessage />
    } else {
        if (searchResult.length > 1) {
            display = <DisplayMultipleCountries
                countries={searchResult}
                renderCountry={renderCountry}
                setRenderCountry={setRenderCountry} />
        } else if (searchResult.length === 1) {
            display = <DisplaySingleCountry country={searchResult[0]} />
        }
    }

    return display
}


const ErrorMessage = () => (<div>Too many matches, specify another filter</div>)


const DisplayMultipleCountries = ({ countries, renderCountry, setRenderCountry }) => {
    const renderList = countries
        .map(country => ({ id: nanoid(), ...country }))

    return (
        <ul>
            {renderList.map(country =>
                <li key={country.id}>
                    {country.name.common}
                    <button onClick={() => setRenderCountry(country)}>show</button>
                </li>
            )}
            {(renderCountry !== null) &&
                <DisplaySingleCountry country={renderCountry} />
            }
        </ul>
    )
}


const DisplaySingleCountry = ({ country }) => {
    console.log('single country', country)
    const name = country.name.common
    const capital = country.capital[0]
    const area = country.area
    const languages = country.languages
    const langKey = Object.keys(languages)
    const flag = country.flags.png
    const apiKey = process.env.REACT_APP_API_KEY
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/3.0/onecall?`
                + `lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

    console.log('weather', weather)

    return (
        <>
            <h1>{name}</h1>
            <div>capital {capital}</div>
            <div>area {area}</div>

            <h4>languages</h4>
            <ul>
                {langKey.map(key =>
                    <li key={key}>{languages[key]}</li>
                )}
            </ul>
            <img src={flag} alt={name + "'s flag"} />

            <h2>Weather in {capital}</h2>
            {weather !== null &&
                <>
                    <div>wind {weather.current.wind_speed} m/s</div>
                    <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                        alt='weather icon' />
                    <div>temperature {weather.current.temp - 273.15} C</div>
                </>
            }

        </>
    )
}

export default DisplayResult