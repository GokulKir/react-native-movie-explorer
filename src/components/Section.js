
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MovieCard from './MovieCard';
import MovieListSkeletonLoader from './MovieListSkeletonLoader';
import styles from './styles';
import {ThemeContext} from '../context/ThemeProvider';


const fallbackTheme = {
  isDark: false,
  backgroundColor: '#f5f5f5',
  textColor: '#1a1a1a',
  secondaryTextColor: '#666',
  placeholderTextColor: '#999',
  overlayBackground: 'rgba(255, 255, 255, 0.95)',
  searchBackground: '#fff',
  buttonBackground: 'rgba(0, 0, 0, 0.05)',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  shadowColor: '#000',
  accentColor: '#FF5733',
  skeletonBaseColor: '#e0e0e0',
  skeletonHighlightColor: '#f5f5f5',
};


const Section = ({
  title,
  data,
  loading,
  error,
  onEndReached,
  navigation,
  hasMore,
  refreshInterval = 30000,
}) => {
  const contextValue = useContext(ThemeContext);
  const theme = contextValue?.theme || fallbackTheme;

  const renderFooter = () => {
    if (!hasMore || !loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={theme.accentColor || fallbackTheme.accentColor} />
      </View>
    );
  };

  useEffect(() => {
    if (!hasMore || loading || !onEndReached) return;

    const interval = setInterval(() => {
      if (hasMore && !loading) {
        try {
          onEndReached();
        } catch (err) {
          console.error(`Error in ${title} refresh interval:`, err);
        }
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [hasMore, loading, onEndReached, refreshInterval, title]);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.textColor || fallbackTheme.textColor }]}>
          {title}
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAll, { color: theme.accentColor || fallbackTheme.accentColor }]}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {loading && data.length === 0 ? (
        <FlatList
          data={[1, 2, 3, 4]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.toString()}
          renderItem={() => (
            <MovieListSkeletonLoader
              type="movieCard"
              theme={theme}
              navigation={navigation}
            />
          )}
          contentContainerStyle={styles.movieList}
        />
      ) : error ? (
        <Text style={[styles.noResultsText, { color: theme.secondaryTextColor || fallbackTheme.secondaryTextColor }]}>
          Error: {error}
        </Text>
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              theme={theme}
              navigation={navigation}
            />
          )}
          onEndReached={() => {
            if (hasMore && !loading && onEndReached) {
              try {
                onEndReached();
              } catch (err) {
                console.error(`Error in ${title} onEndReached:`, err);
              }
            }
          }}
          onEndReachedThreshold={0.7}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.movieList}
        />
      ) : (
        <Text style={[styles.noResultsText, { color: theme.secondaryTextColor || fallbackTheme.secondaryTextColor }]}>
          No {title.toLowerCase()} found
        </Text>
      )}
    </View>
  );
};

export default Section;
