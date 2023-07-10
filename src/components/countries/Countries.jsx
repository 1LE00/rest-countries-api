import './countries.css';
import Country from "../country/Country"

const Countries = ({ countries, toggle, search }) => {
    const sorted = countries.sort((a, b) => a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase()));

    return (
        <section className={`countries flex ${toggle ? 'dark' : 'light'}`} style={search.length > 0 ? { justifyContent: 'flex-start' } : null}>
            {sorted.length !== 0 ? sorted.sort().map((country, index) => (
                <Country
                    key={index}
                    toggle={toggle}
                    name={country.name.common}
                    population={country.population.toLocaleString()}
                    region={country.region}
                    capital={country.capital.length === 0 ? 'Not Declared' : country.capital[0]}
                    flags={country.flags}
                />
            )) : <p className='no-countries'>No countries found with name <span>'{search}'</span></p>}
        </section>
    )
}

export default Countries