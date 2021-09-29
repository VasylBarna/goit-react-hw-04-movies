import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <nav className={styles.nav}>
    <NavLink
      exact
      to="/"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      home
    </NavLink>
    <NavLink
      to="/movies"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      movies
    </NavLink>
  </nav>
);

export default Navigation;
