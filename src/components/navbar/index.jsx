import { NavLink } from "react-router-dom";
import s from "./navbar.module.css";
import icon from "../../assets/form.png";

export default function Navbar() {
  return (
    <nav className={s.navbar}>
      <div className={s.titleContainer}>
        <img src={icon} className={s.logo} />
        <h1 className={s.title}>Información de contacto</h1>
      </div>
      
      <ul className={s.ul}>
        <li className={s.li}>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? s.navlink : isActive ? s.activeLink : s.navlink
            }
            exact="true"
            to="/"
          >
            formulario
          </NavLink>
        </li>
        <li className={s.li}>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? s.navlink : isActive ? s.activeLink : s.navlink
            }
            exact="true"
            to="/responses"
          >
            respuestas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
