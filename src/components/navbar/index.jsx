import { NavLink } from "react-router-dom";
import s from "./navbar.module.css";
import icon from '../../assets/form.png'

export default function Navbar() {
  return (
    <nav className={s.navbar}>
      <div className={s.titleContainer}>
      <img src={icon} className={s.logo}/>
      <h1 className={s.title}>Contact Information</h1>
      
      </div>
      <h4 className={s.message}>
        Please provide the required information in the form below. Ensure that
        you answer all questions accurately and completely
      </h4>
      <ul className={s.ul}>
        <li className={s.li}>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? s.navlink : isActive ? s.activeLink : s.navlink
            }
            exact="true"
            to="/"
          >
            form
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
            responses
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
