import './header.css'
import Moon from '../../assets/icons/icon-moon.svg'
import Sun from '../../assets/icons/icon-sun.svg'
import { useNavigate } from 'react-router-dom'

const Header = ({ toggle, setToggle }) => {
    const navigate = useNavigate();
    const changeTheme = () => {
        setToggle(theme => {
            return !theme
        })
    }
    return (
        <header className={`header flex ${toggle ? 'dark' : 'light'}`}>
            <section className={`header-title flex ${toggle ? 'dark' : 'light'}`}>
                <h1 onClick={() => navigate('/')}>Where in the world?</h1>
            </section>
            <section className='toggle' title={toggle ? 'Switch to Light Mode' : 'Switch to Dark Mode'} >
                {toggle ?
                    <button className={`btn-toggle flex ${toggle ? 'dark' : 'light'}`} onClick={changeTheme}>
                        <section className="toggle-icon"><img src={Sun} alt="Light Icon" title='Switch to Light Mode' /></section>
                        <section className="toggle-text">Light Mode</section>
                    </button> :
                    <button className={`btn-toggle flex ${toggle ? 'dark' : 'light'}`} onClick={changeTheme}>
                        <section className="toggle-icon"><img src={Moon} alt="Dark Icon" title='Switch to Dark Mode' /></section>
                        <section className="toggle-text">Dark Mode</section>
                    </button>}
            </section>
        </header>
    )
}

export default Header