import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <NavLink exact to="/" className={'link'} activeClassName={'activeLink'}>
      home
    </NavLink>
    <NavLink to="/movies" className={'link'} activeClassName={'activeLink'}>
      movies
    </NavLink>
  </nav>
);

export default Navigation;
