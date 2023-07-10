import './search.css'
import { ReactComponent as Second } from '../../assets/icons/search-outline.svg'

const Search = ({ search, setSearch, toggle, setFilter }) => {
    const handleSearch = (e) => {
        e.preventDefault();
    }
    return (
        <form
            action=""
            method="get"
            className={`form-search flex w-100 br-5 ${toggle ? 'dark' : 'light'}`}
            name='form-search'
            onSubmit={handleSearch}>
            <Second />
            <label htmlFor="search" className='hidden'>Search for a country...</label>
            <input
                type="text"
                name="q"
                id="search"
                value={search}
                placeholder='Search for a country...'
                autoComplete='off'
                maxLength='75'
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    )
}

export default Search