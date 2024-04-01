import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
        <>
            <nav>
                <ul className="Container">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Privacy">Privacy</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Qlnv">QLNV</NavLink>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;