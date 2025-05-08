import React, { useContext, useEffect } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeProvider';
import useMoviesRedux from '../hooks/useMoviesRedux';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorView from '../components/ErrorView';
import MovieInfo from '../components/MovieInfo';
import styles from '../components/styles';

// Functional component for displaying movie details
export default function MovieDetailScreen() {
  // Access route params and navigation utilities
  const route = useRoute();
  const navigation = useNavigation();
  
  // Access theme from ThemeContext for dynamic styling
  const { theme } = useContext(ThemeContext);
  
  // Custom hook to access Redux state and actions for movie data
  const { fetchMovieDetailsById, movieDetails, loading, error } = useMoviesRedux();

  // Destructure movie from route params (fallback to empty object if undefined)
  const { route: movie } = route.params || {};

  // Fetch movie details when the component mounts or originalId changes
  useEffect(() => {
    if (movie?.originalId) {
      fetchMovieDetailsById(movie.originalId);
    }
  }, [movie?.originalId, fetchMovieDetailsById]);

  // Determine which movie data to display (fetched details or fallback to route params)
  const movieData =
    movieDetails?.id?.toString() === movie?.originalId ? movieDetails : movie;

  // Construct movie poster URL or fallback to placeholder
  const movieImage = movieData?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : movieData?.image || 'https://via.placeholder.com/500';

  // Display skeleton loader while loading and no movie data is available
  if (loading && !movieData) {
    return <SkeletonLoader theme={theme} />;
  }

  // Display error view if an error occurs
  if (error) {
    return (
      <ErrorView
        theme={theme}
        error={error}
        onRetry={() =>
          movie?.originalId && fetchMovieDetailsById(movie.originalId)
        }
      />
    );
  }

  // Main render: Display movie details with a background image and back button
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ImageBackground
        source={{ uri: movieImage }}
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={10}>
        <View style={styles.overlay} />
        <TouchableOpacity
          style={[
            styles.backButton,
            { backgroundColor: theme.buttonOverlayBackground },
          ]}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={28} color={theme.textColor} />
        </TouchableOpacity>
        <MovieInfo movieData={movieData} theme={theme} />
      </ImageBackground>
    </SafeAreaView>
  );
}