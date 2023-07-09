import './details.css'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import SkeletonDetails from '../skeleton/SkeletonDetails';
import { ReactComponent as Arrow } from '../assets/icons/arrow-left-long-solid.svg'

const Details = ({ countries, toggle, isLoading }) => {
  const [details, setDetails] = useState({
    native: '',
    currency: '',
    languages: '',
    borders: []
  })
  const [currentCountry, setCurrentCountry] = useState({});
  const { country } = useParams();

  useEffect(() => {
    const currentCountry = countries.find(con => con.name.common.toLowerCase() === country.toLowerCase());
    currentCountry && setCurrentCountry(currentCountry);
    if (currentCountry) {
      const native = Object.keys(currentCountry.name.nativeName).length === 0 ? 'No Native Names' : currentCountry.name.nativeName[Object.keys(currentCountry.name.nativeName)[0]].common;
      const currency = Object.keys(currentCountry.currencies).length === 0 ? 'No Currencies' : currentCountry.currencies[Object.keys(currentCountry.currencies)[0]].name;
      const languages = Object.keys(currentCountry.languages).length === 0 ? 'No Languages' : (Object.entries(currentCountry.languages)).map(([key, value]) => value).sort().join(", ");
      const borders = currentCountry.borders.length === 0 ? 'No Borders' : currentCountry.borders;

      setDetails({
        native: native,
        currency: currency,
        languages: languages,
        borders: borders
      });
    }
  }, [countries, country]);

  const getBorderNames = (border) => {
    return ((countries.find(country => country.cca3 === border)).name.common);
  }

  return (
    isLoading ? <SkeletonDetails toggle={toggle} />
      : Object.entries(currentCountry).length > 0 ?
        <section className={`details ${currentCountry.name.common.toLowerCase()}-details flex flex-column`}>
          <Link to='/rest-countries-api/countries' className={`go-back flex ${toggle ? 'dark' : 'light'} br-5`}>
            <Arrow />
            <b>Back</b>
          </Link>
          <section className="details-section flex flex-column w-100">
            <section className={`flag-container ${toggle ? 'dark' : 'light'}`}>
              <img src={currentCountry.flags.png} alt={currentCountry.flags.alt} title={`Flag of ${currentCountry.name.common}`} loading='lazy' />
            </section>

            <section className={`country-info ${currentCountry.name.common.toLowerCase()}-info flex flex-column ${toggle ? 'dark' : 'light'}`}>
              <h2 className='country-common-name'>{currentCountry.name.common}</h2>
              <section className="country-stats flex flex-column">
                <section className={`country-stats-top flex flex-column ${toggle ? 'dark' : 'light'}`}>
                  <dl className='native-name flex'>
                    <dt className='key'>Native Name:</dt>
                    <dd className='value'>{details.native}</dd>
                  </dl>
                  <dl className='population flex'>
                    <dt className='key'>Population:</dt>
                    <dd className='value'>{currentCountry.population.toLocaleString()}</dd>
                  </dl>
                  <dl className='region flex'>
                    <dt className='key'>Region:</dt>
                    <dd className='value'>{currentCountry.region}</dd>
                  </dl>
                  <dl className='sub-region flex'>
                    <dt className='key'>Sub Region:</dt>
                    <dd className='value'>{currentCountry.subregion.length === 0 ? 'No Subregion' : currentCountry.subregion}</dd>
                  </dl>
                  <dl className='capital flex'>
                    <dt className='key'>Capital:</dt>
                    <dd className='value'>{currentCountry.capital.length > 0 ? currentCountry.capital[0] : 'No Capital'}</dd>
                  </dl>
                </section>
                <section className={`country-stats-bottom flex flex-column ${toggle ? 'dark' : 'light'}`}>
                  <dl className='top-level-domain flex'>
                    <dt className='key'>Top-Level-Domain:</dt>
                    <dd className='value'>{currentCountry.tld[0]}</dd>
                  </dl>
                  <dl className='population flex'>
                    <dt className='key'>Currencies:</dt>
                    <dd className='value'>{details.currency}</dd>
                  </dl>
                  <dl className='region flex'>
                    <dt className='key'>Languages:</dt>
                    <dd className='value'>{details.languages}</dd>
                  </dl>
                </section>
                <dl className={`country-borders flex flex-column ${toggle ? 'dark' : 'light'}`}>
                  <dt className='key'>Border Countries:</dt>
                  {(Array.isArray(details.borders)) ?
                    <section className={`border-items flex ${toggle ? 'dark' : 'light'}`}>
                      {details.borders.map((border, index) => <dd key={index} className='value br-5'><Link to={`/countries/${getBorderNames(border)}`}>{getBorderNames(border)}</Link></dd>)}
                    </section>
                    : <dd className='value'>{details.borders}</dd>}
                </dl>
              </section>
            </section>
          </section>
        </section>
        : <section className={`missing flex flex-column ${toggle ? 'dark' : 'light'}`}>
          <h1>No Details of country '<span>{country}</span>' was found.</h1>
          <p>Return to <Link to='/rest-countries-api'>Homepage</Link></p>
        </section>
  )

}

export default Details