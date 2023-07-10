import Header from "../components/header/Header"
import { Outlet } from "react-router-dom"

const Layout = ({ toggle, setToggle }) => {
    return (
        <div className={`App ${toggle ? 'dark' : 'light'}`}>
            <Header toggle={toggle} setToggle={setToggle} />
            <Outlet />
        </div>
    )
}

export default Layout