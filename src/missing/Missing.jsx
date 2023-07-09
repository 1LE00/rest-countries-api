import './missing.css';
import { Link } from "react-router-dom"

const Missing = ({ toggle }) => {
  return (
    <section className={`missing flex flex-column ${toggle ? 'dark' : 'light'}`}>
      <h1>Page Not Found</h1>
      <p>Return to <Link to='/rest-countries-api'>Homepage</Link></p>
    </section>
  )
}

export default Missing