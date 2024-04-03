import { NavLink } from "react-router-dom";

export const Navbar = () => {
    const linkState = ({ isActive }) => ({
        textDecorationColor: isActive && "#242525",
    });

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={"/"} style={linkState}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/booking"} style={linkState}>
                        Booking
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/contact"} style={linkState}>
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin"} style={linkState}>
                        Admin
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
