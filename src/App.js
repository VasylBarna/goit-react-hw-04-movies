import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Container from './components/Container';
import AppBar from './components/AppBar';

const Homepage = lazy(() => import('./Views/HomePage'));
const MoviesPage = lazy(() => import('./Views/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./Views/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./Views/NotFoundPage'));

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:id">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
