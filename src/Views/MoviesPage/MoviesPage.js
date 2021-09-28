import { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import * as Api from '../../services/Api';
import queryString from 'query-string';

const MoviesPage = () => {
  const [requestSearch, setRequestSearch] = useState([]);
  // eslint-disable-next-line no-use-before-define
  const [query, setQuery] = useState(queryString.parse(search)?.query || '');
  const { pathname, search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!search) {
      return;
    }
    Api.fetchSearch(query).then(data => setRequestSearch(data.results));
    setQuery('');
  }, [query, search]);

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return;
    }

    history.push({ pathname, search: `query=${query}` });
  };

  const handleChange = event => {
    setQuery(event.currentTarget.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={query}
          type="text"
          placeholder="Enter the title of the movie"
        />
        <button type="submit">Search</button>
      </form>
      {requestSearch && requestSearch.length > 0 && (
        <ul>
          {requestSearch.map(({ id, title, name }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    backUrl: pathname,
                    query: queryString.parse(search)?.query,
                  },
                }}
              >
                {title || name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;
