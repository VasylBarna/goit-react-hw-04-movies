import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Api from '../../services/Api';

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    Api.fetchTrending().then(result => setTrending(result.results));
  }, []);
  return (
    <>
      <h1>Most Trending Movies Today</h1>
      <ul>
        {trending &&
          trending.map(({ id, name, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: { backUrl: pathname },
                }}
              >
                {title || name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
