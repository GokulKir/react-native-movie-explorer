
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiInstance from '../../api/apiInstance';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page = 1, {rejectWithValue}) => {
    try {
      const res = await apiInstance.get('/movie/popular', {
        params: {page},
      });
      return {results: res.data.results, page};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async (page = 1, {rejectWithValue}) => {
    try {
      const res = await apiInstance.get('/movie/upcoming', {
        params: {page},
      });
      return {results: res.data.results, page};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlayingMovies',
  async (page = 1, {rejectWithValue}) => {
    try {
      const res = await apiInstance.get('/movie/top_rated', {
        params: {page},
      });
      return {results: res.data.results, page};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId, {rejectWithValue}) => {
    try {
      const res = await apiInstance.get(`/movie/${movieId}`);
      const movie = res.data;
      return {
        id: movie.id,
        originalId: movie.id.toString(),
        title: movie.title || movie.original_title,
        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500',
        year: movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : 'N/A',
        genres: movie.genres ? movie.genres.map(genre => genre.name) : ['N/A'],
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
        description: movie.overview || 'No description available.',
        category: 'Movie', // Assuming movie endpoint returns movies
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    upcomingMovies: [],
    nowPlayingMovies: [],
    movieDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetMovies: state => {
      state.popularMovies = [];
      state.upcomingMovies = [];
      state.nowPlayingMovies = [];
      state.movieDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPopularMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularMovies =
          action.payload.page === 1
            ? action.payload.results
            : [...state.popularMovies, ...action.payload.results];
        state.loading = false;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUpcomingMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcomingMovies =
          action.payload.page === 1
            ? action.payload.results
            : [...state.upcomingMovies, ...action.payload.results];
        state.loading = false;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNowPlayingMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlayingMovies =
          action.payload.page === 1
            ? action.payload.results
            : [...state.nowPlayingMovies, ...action.payload.results];
        state.loading = false;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {resetMovies} = movieSlice.actions;
export default movieSlice.reducer;
