import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import MovieInfoSkeleton from './MovieInfoSkeleton';

const MovieInfo = ({ movieData, theme }) => {
  const genres = Array.isArray(movieData?.genres)
    ? movieData.genres.map(genre => genre.name || genre)
    : movieData?.genres || ['N/A'];
  const rating = movieData?.vote_average
    ? movieData.vote_average.toFixed(1)
    : movieData?.rating || 'N/A';
  const year = movieData?.release_date
    ? new Date(movieData.release_date).getFullYear()
    : movieData?.year || 'N/A';
  const description =
    movieData?.overview ||
    movieData?.description ||
    'No description available.';
  const movieTitle = movieData?.title || 'Unknown Title';

  if (!movieData || description === 'No description available.') {
    return <MovieInfoSkeleton theme={theme} />;
  }

  return (
    <View
      style={[
        styles.detailsContainer,
        {
          backgroundColor: theme.overlayBackground,
          shadowColor: theme.shadowColor,
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.accentColor }]}>
        {movieTitle.toUpperCase()}
      </Text>
      <View style={styles.infoRow}>
        <Text style={[styles.infoText, { color: theme.secondaryTextColor }]}>
          {year} • {genres.join(', ')} • {rating} ⭐
        </Text>
      </View>
      <Text
        style={[styles.description, { color: theme.secondaryTextColor }]}
        numberOfLines={4}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.watchButton, { backgroundColor: theme.accentColor }]}
          onPress={() => {}}
        >
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            WATCH NOW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.trailerButton, { borderColor: theme.borderColor }]}
          onPress={() => {}}
        >
          <Text style={[styles.trailerButtonText, { color: theme.textColor }]}>
            TRAILER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieInfo;