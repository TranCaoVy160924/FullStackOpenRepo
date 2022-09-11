const DisplayResult = ({ searchResult }) => {
    let display

    if (searchResult.length > 10) {
        display = <ErrorMessage />
    } else {
        display = <CountriesList countries={searchResult} />
    }

    return display
}


const ErrorMessage = () => (<div>Too many matches, specify another filter</div>)


const CountriesList = ({ countries }) => (
    <ul>
        {countries.map(country => <li key={country.id}>{country.name}</li>)}
    </ul>
)

export default DisplayResult