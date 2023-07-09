import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './home/Home';
import Details from './details/Details';
import { useState, useEffect } from 'react';
import Missing from './missing/Missing';

function App() {
  const [toggle, setToggle] = useState(JSON.parse(localStorage.getItem('theme')) === null ? true : JSON.parse(localStorage.getItem('theme')).state);
  const [selectedOption, setSelectedOption] = useState('Filter by Region');
  const [filter, setFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const fields = 'name,capital,currencies,languages,region,subregion,population,borders,flags,tld,cca3';
  const api = `https://restcountries.com/v3.1/all?fields=${fields}`;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(api);
        const responseData = await response.json();
        setCountries(responseData)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (selectedOption === 'Filter by Region') {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }, [selectedOption])

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify({ state: toggle }));
  }, [toggle])

  return (
    <Routes>
      <Route path="/rest-countries-api" element={<Layout toggle={toggle} setToggle={setToggle} />}>
        <Route index
          element={
            <Home
              toggle={toggle}
              search={search}
              setSearch={setSearch}
              setFilter={setFilter}
              isLoading={isLoading}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              countries={filter && search.length > 0 ?
                countries.filter(country =>
                  (country.region.toLowerCase()).includes(selectedOption.toLowerCase()) &&
                  (country.name.common.toLowerCase()).includes(search.toLowerCase())) :
                filter ? countries.filter(country => (country.region.toLowerCase()).includes(selectedOption.toLowerCase()))
                  : countries.filter(country => (country.name.common.toLowerCase()).includes(search.toLowerCase()))}
            />
          }
        />
        <Route path='*' element={<Missing toggle={toggle} />} />
      </Route>
      <Route path="/rest-countries-api/countries" element={<Layout toggle={toggle} setToggle={setToggle} />}>
        <Route index
          element={
            <Home toggle={toggle}
              search={search}
              setSearch={setSearch}
              setFilter={setFilter}
              isLoading={isLoading}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              countries={filter && search.length > 0 ?
                countries.filter(country =>
                  (country.region.toLowerCase()).includes(selectedOption.toLowerCase()) &&
                  (country.name.common.toLowerCase()).includes(search.toLowerCase())) :
                filter ? countries.filter(country => (country.region.toLowerCase()).includes(selectedOption.toLowerCase()))
                  : countries.filter(country => (country.name.common.toLowerCase()).includes(search.toLowerCase()))}
            />
          }
        />
        <Route path=':country' element={<Details toggle={toggle} countries={countries} isLoading={isLoading} />} />
      </Route>
      <Route path='*' element={<Missing toggle={toggle} />} />

    </Routes>
  );
}

export default App;
