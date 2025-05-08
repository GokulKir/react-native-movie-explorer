import {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPopularMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchMovieDetails,
  resetMovies,
} from '../redux/slices/movieSlice';

const useMoviesRedux = () => {
  const dispatch = useDispatch();
  const {
    popularMovies,
    upcomingMovies,
    nowPlayingMovies,
    movieDetails,
    loading,
    error,
  } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies(1)); // Fetch initial page of popular movies
    dispatch(fetchUpcomingMovies(1)); // Fetch initial page of upcoming movies
    dispatch(fetchNowPlayingMovies(1)); // Fetch initial page of now playing movies
  }, [dispatch]);

  const refreshMovies = useCallback(() => {
    dispatch(resetMovies()); // Clear existing movies
    dispatch(fetchPopularMovies(1)); // Fetch first page of popular movies
    dispatch(fetchUpcomingMovies(1)); // Fetch first page of upcoming movies
    dispatch(fetchNowPlayingMovies(1)); // Fetch first page of now playing movies
  }, [dispatch]);

  const fetchMovieDetailsById = useCallback(
    movieId => {
      dispatch(fetchMovieDetails(movieId));
    },
    [dispatch],
  );

  return {
    popularMovies,
    upcomingMovies,
    nowPlayingMovies,
    movieDetails,
    loading,
    error,
    refreshMovies,
    fetchMovieDetailsById,
  };
};

export default useMoviesRedux;
