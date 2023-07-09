import './fields.css'
import Search from '../search/Search'
import Filter from '../filter/Filter'

const Fields = ({ search, setSearch, toggle, selectedOption, setSelectedOption, setFilter }) => {
    return (
        <section className='fields flex'>
            <Search toggle={toggle} search={search} setSearch={setSearch} setFilter={setFilter} />
            <Filter toggle={toggle} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </section>
    )
}

export default Fields