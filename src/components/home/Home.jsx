import Countries from "../countries/Countries"
import Fields from "../fields/Fields"
import Skeleton from "../skeleton/Skeleton"

const Home = ({ search, setSearch, toggle, countries, selectedOption, setSelectedOption, setFilter, isLoading }) => {
    return (
        <>
            <Fields
                toggle={toggle}
                search={search}
                setFilter={setFilter}
                setSearch={setSearch}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            {isLoading || (countries.length === 0 && search.length === 0)
                ? <Skeleton toggle={toggle} /> :
                <Countries countries={countries} toggle={toggle} search={search} />}
        </>
    )
}

export default Home