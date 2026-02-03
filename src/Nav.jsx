import { NavLink } from 'react-router-dom'

function Nav() {
  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <NavLink to="/#top" className={linkClass}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/#projects" className={linkClass}>Projects</NavLink>
        </li>
        <li>
          <NavLink to="/#links" className={linkClass}>Links</NavLink>
        </li>
        <li>
          <NavLink to="/#contact" className={linkClass}>Contact</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;
