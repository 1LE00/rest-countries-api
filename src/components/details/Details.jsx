import './details.css';
import KeyValue from './KeyValue';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../assets/icons/arrow-left-long-solid.svg';

const Details = ({ countries, toggle }) => {
  /**
   * * Changing to urlCountry due to naming conflicts 
   */
  const { country: urlCountry } = useParams();

  const [countryDetails, setCountryDetails] = useState({
    country: null,
    found: false,
    details: {
      native: '',
      currency: '',
      languages: '',
      borders: [],
    },
  });

  useEffect(() => {
    const currentCountry = countries.find(
      (country) => country.name.common.toLowerCase() === urlCountry.toLowerCase()
    );
    /** 
     * * Converting the value of currenCountry into an equivalent Boolean 
     */
    const found = !!currentCountry;

    if (found) {
      /**
       *  * Find native and currency using optional chaining and nullish coalescing
       */
      const native =
        currentCountry.name.nativeName?.[Object.keys(currentCountry.name.nativeName)[0]]?.common ?? 'No Native Names';
      const currency =
        currentCountry.currencies?.[Object.keys(currentCountry.currencies)[0]]?.name ?? 'No Currencies';
      const languages =
        Object.keys(currentCountry.languages).length > 0 ? Object.values(currentCountry.languages).sort().join(", ") : 'No Languages';
      const borders = currentCountry.borders.length > 0 ? currentCountry.borders : 'No Borders';

      setCountryDetails({
        country: currentCountry,
        found: false,
        details: {
          native,
          currency,
          languages,
          borders,
        },
      });
    } else {
      setCountryDetails((prevState) => ({
        ...prevState,
        found: true,
      }));
    }
  }, [countries, urlCountry]);
  useEffect(() => {
    console.log(countryDetails);
  }, [countryDetails])
  /**
   *  * Convert the country code to country name
   *  @param border is country code, like FRA for France
   */
  const getBorderNames = (border) => {
    const borderCountry = countries.find((country) => country.cca3 === border);
    return borderCountry ? borderCountry.name.common : '';
  };
  /**
   * * Render Missing section when user access details of undefined country
   */
  if (countryDetails.found) {
    return (
      <section className={`missing missing-details flex flex-column ${toggle ? 'dark' : 'light'}`}>
        <h1>No Details of country '<span>{urlCountry}</span>' was found.</h1>
        <p>
          Return to <Link to='/'>Homepage</Link>
        </p>
      </section>
    );
  }

  const { country, details } = countryDetails;

  return (
    <section className={`details ${country?.name.common.toLowerCase()}-details flex flex-column`}>
      <Link to='/countries' className={`go-back flex ${toggle ? 'dark' : 'light'} br-5`}>
        <Arrow />
        <b>Back</b>
      </Link>
      <section className="details-section flex flex-column w-100">
        <section className={`flag-container ${toggle ? 'dark' : 'light'}`}>
          {country?.flags && (
            <img src={country.flags.png} alt={country.flags.alt} title={`Flag of ${country?.name.common}`} loading='lazy' />
          )}
        </section>

        <section className={`country-info ${country?.name && country.name.common.toLowerCase()}-info flex flex-column ${toggle ? 'dark' : 'light'}`}>
          <h2 className='country-common-name'>{country?.name && country.name.common}</h2>
          <section className="country-stats w-100 flex flex-column">
            <section className={`country-stats-top flex flex-column ${toggle ? 'dark' : 'light'}`}>
              <KeyValue keyLabel='Native Name:' value={details.native} />
              <KeyValue keyLabel='Population:' value={country?.population.toLocaleString()} />
              <KeyValue keyLabel='Region:' value={country?.region} />
              <KeyValue keyLabel='Sub Region:' value={country?.subregion.length === 0 ? 'No Subregion' : country?.subregion} />
              <KeyValue keyLabel='Capital:' value={country?.capital[0] || 'No Capital'} />
            </section>
            <section className={`country-stats-bottom flex flex-column ${toggle ? 'dark' : 'light'}`}>
              <KeyValue keyLabel='Top-Level-Domain:' value={country?.tld[0]} />
              <KeyValue keyLabel='Currencies:' value={details.currency} />
              <KeyValue keyLabel='Languages:' value={details.languages} />
            </section>
            <dl className={`country-borders flex flex-column ${toggle ? 'dark' : 'light'}`}>
              <dt className='key'>Border Countries:</dt>
              {Array.isArray(details.borders) ? (
                <section className={`border-items flex ${toggle ? 'dark' : 'light'}`}>
                  {details.borders.map((border, index) => (
                    <dd key={index} className='value br-5'>
                      <Link to={`/countries/${getBorderNames(border)}`}>{getBorderNames(border)}</Link>
                    </dd>
                  ))}
                </section>
              ) : (
                <dd className='value'>{details.borders}</dd>
              )}
            </dl>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Details;
