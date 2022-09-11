const SearchCountries = ({ keyword, handleChange }) => (
    <div>
        find country:
        <input value={keyword} onChange={handleChange} />
    </div>
)

export default SearchCountries