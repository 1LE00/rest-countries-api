import { useNavigate } from 'react-router-dom';
import './country.css';

const Country = ({ toggle, name, population, region, capital, flags }) => {
    const navigate = useNavigate();

    const gotoDetails = () => {
        navigate(`/countries/${name}`);
    }

    return (
        <section className={`country ${name.toLowerCase()} ${toggle ? 'dark' : 'light'} br-5 w-100`} onClick={gotoDetails}>
            <section className='flag br-top-5'>
                <img src={flags.png} alt={flags.alt} title={`Flag of ${name}`} loading='lazy' />
            </section>
            <section className={`country-content flex flex-column ${toggle ? 'dark' : 'light'} br-bottom-5`}>
                <h2 className='country-name'>{name}</h2>
                <section className={`micro-details flex flex-column ${toggle ? 'dark' : 'light'}`}>
                    <dl className='population flex'>
                        <dt className='key'>Population:</dt>
                        <dd className='value'>{population}</dd>
                    </dl>
                    <dl className='region flex'>
                        <dt className='key'>Region:</dt>
                        <dd className='value'>{region}</dd>
                    </dl>
                    <dl className='capital flex'>
                        <dt className='key'>Capital:</dt>
                        <dd className='value'>{capital}</dd>
                    </dl>
                </section>
            </section>
        </section>
    )
}

export default Country