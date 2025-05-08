import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

const MovieCard = ({movie, theme, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation(movie)}
      style={[
        styles.movieItem,
        {
          ...Platform.select({
            ios: {
              shadowColor: theme.shadowColor,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 2,
            },
          }),
        },
      ]}>
      <Image
        source={{uri: movie.image}}
        style={styles.movieThumbnail}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <Text
          style={[styles.movieTitle, {color: theme.textColor}]}
          numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={[styles.movieCategory, {color: theme.secondaryTextColor}]}>
          {movie.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: 110,
    marginRight: 12,
  },
  movieThumbnail: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  movieInfo: {
    marginTop: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  movieCategory: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default MovieCard;
