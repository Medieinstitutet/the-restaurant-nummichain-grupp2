import { NavLink, Outlet } from 'react-router-dom';
import "../styles/main.scss";

export const Layout = () => {
    return (
      <div className="wrapper">
        <header>
          <nav>
            <ul>
              <li><NavLink to={"/"}>Home</NavLink></li>
              <li><NavLink to={"/booking"}>Booking</NavLink></li>
              <li><NavLink to={"/contact"}>Contact</NavLink></li>
              <li><NavLink to={"/admin"}>Admin</NavLink></li>
            </ul>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </div>
    );
  };