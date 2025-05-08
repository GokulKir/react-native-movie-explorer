// Import necessary React and React Native dependencies
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  FlatList,
  Platform,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons in UI
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'; // For animations
import {ThemeContext} from '../context/ThemeProvider'; // Context for theme management
import {useDispatch, useSelector} from 'react-redux'; // Redux hooks for state management
import {
  fetchPopularMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  resetMovies,
} from '../redux/slices/movieSlice'; // Redux actions for movie data
import useNavigations from '../hooks/useNavigations'; // Custom hook for navigation
import FeaturedSlider from '../components/FeaturedSlider'; // Component for featured movies slider
import Section from '../components/Section'; // Component for movie sections
import {filterMovies, sortMovies} from '../utils/utils'; // Utility functions for filtering/sorting
import styles from '../components/styles'; // Shared styles

// Get window height for responsive design
const {height} = Dimensions.get('window');
// Calculate status bar height based on platform
const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 44;

// Memoized tabs array to avoid re-renders
const TABS = [
  {name: 'Movies', icon: 'film-outline'},
  {name: 'Anime', icon: 'sparkles-outline'},
  {name: 'My List', icon: 'bookmark-outline'},
];

// Fallback theme object used when ThemeContext is unavailable
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

// Simple debounce utility to prevent excessive function calls
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Custom hook to manage Redux movie state and actions
const useMoviesRedux = () => {
  const dispatch = useDispatch();
  // Select movie data, loading state, and error from Redux store
  const {popularMovies, upcomingMovies, nowPlayingMovies, loading, error} =
    useSelector(state => state.movies);

  // Fetch initial movie data on mount
  useEffect(() => {
    dispatch(fetchPopularMovies(1));
    dispatch(fetchUpcomingMovies(1));
    dispatch(fetchNowPlayingMovies(1));
  }, [dispatch]);

  // Function to reset and refresh movie data
  const refreshMovies = useCallback(() => {
    dispatch(resetMovies());
    dispatch(fetchPopularMovies(1));
    dispatch(fetchUpcomingMovies(1));
    dispatch(fetchNowPlayingMovies(1));
  }, [dispatch]);

  return {
    popularMovies,
    upcomingMovies,
    nowPlayingMovies,
    loading,
    error,
    refreshMovies,
  };
};

// Main MovieListScreen component
export default function MovieListScreen() {
  // Access theme from context or use fallback
  const contextValue = useContext(ThemeContext);
  const theme = contextValue?.theme || fallbackTheme;
  // Navigation hook for movie detail page
  const {MOVIE_DETAIL_PAGE_NAVIGATION} = useNavigations() || {};
  // Redux movie data and state
  const {
    popularMovies,
    upcomingMovies,
    nowPlayingMovies,
    loading,
    error,
    refreshMovies,
  } = useMoviesRedux();
  // State for pagination
  const [popularPage, setPopularPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [nowPlayingPage, setNowPlayingPage] = useState(1);
  // State for loading indicators
  const [isPopularLoading, setIsPopularLoading] = useState(false);
  const [isUpcomingLoading, setIsUpcomingLoading] = useState(false);
  const [isNowPlayingLoading, setIsNowPlayingLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSearchOptionsVisible, setIsSearchOptionsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // Ref for search input
  const searchInputRef = useRef(null);
  // Animation values for search options panel
  const slideAnim = useSharedValue(height);
  const fadeAnim = useSharedValue(0);
  const dispatch = useDispatch();

  // Debug ThemeContext availability
  useEffect(() => {
    console.log('ThemeContext value:', contextValue);
    if (!contextValue) {
      console.warn(
        'ThemeContext is undefined. Ensure MovieListScreen is wrapped in ThemeProvider.',
      );
    }
  }, [contextValue]);

  // Debug navigation availability
  useEffect(() => {
    if (!MOVIE_DETAIL_PAGE_NAVIGATION) {
      console.warn(
        'MOVIE_DETAIL_PAGE_NAVIGATION is undefined. Ensure useNavigations is correctly set up.',
      );
    }
  }, [MOVIE_DETAIL_PAGE_NAVIGATION]);

  // Auto-focus search input after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Toggle visibility of search options panel with animation
  const toggleSearchOptions = useCallback(() => {
    if (isSearchOptionsVisible) {
      slideAnim.value = withTiming(height, {duration: 300});
      fadeAnim.value = withTiming(0, {duration: 300});
      setIsSearchOptionsVisible(false);
    } else {
      setIsSearchOptionsVisible(true);
      slideAnim.value = withTiming(0, {duration: 300});
      fadeAnim.value = withTiming(1, {duration: 300});
    }
  }, [isSearchOptionsVisible, slideAnim, fadeAnim]);

  // Handle search input changes
  const handleSearchChange = useCallback(text => {
    setSearchQuery(text);
    setIsSearchLoading(false);
  }, []);

  // Check if more pages are available (TMDB API page limit)
  const hasMorePopular = popularPage < 500;
  const hasMoreUpcoming = upcomingPage < 500;
  const hasMoreNowPlaying = nowPlayingPage < 500;
  const hasMoreSearch =
    searchQuery.length > 0 &&
    (hasMorePopular || hasMoreUpcoming || hasMoreNowPlaying);

  // Load more popular movies
  const loadMorePopular = useCallback(() => {
    if (!isPopularLoading && !loading && hasMorePopular) {
      setIsPopularLoading(true);
      dispatch(fetchPopularMovies(popularPage + 1)).finally(() => {
        setIsPopularLoading(false);
      });
      setPopularPage(prev => prev + 1);
    }
  }, [dispatch, popularPage, isPopularLoading, loading, hasMorePopular]);

  // Load more upcoming movies
  const loadMoreUpcoming = useCallback(() => {
    if (!isUpcomingLoading && !loading && hasMoreUpcoming) {
      setIsUpcomingLoading(true);
      dispatch(fetchUpcomingMovies(upcomingPage + 1)).finally(() => {
        setIsUpcomingLoading(false);
      });
      setUpcomingPage(prev => prev + 1);
    }
  }, [dispatch, upcomingPage, isUpcomingLoading, loading, hasMoreUpcoming]);

  // Load more now playing movies
  const loadMoreNowPlaying = useCallback(() => {
    if (!isNowPlayingLoading && !loading && hasMoreNowPlaying) {
      setIsNowPlayingLoading(true);
      dispatch(fetchNowPlayingMovies(nowPlayingPage + 1)).finally(() => {
        setIsNowPlayingLoading(false);
      });
      setNowPlayingPage(prev => prev + 1);
    }
  }, [
    dispatch,
    nowPlayingPage,
    isNowPlayingLoading,
    loading,
    hasMoreNowPlaying,
  ]);

  // Load more search results across all movie categories
  const loadMoreSearchResults = useCallback(() => {
    if (!isSearchLoading && !loading && hasMoreSearch) {
      setIsSearchLoading(true);
      const promises = [];
      if (hasMorePopular)
        promises.push(dispatch(fetchPopularMovies(popularPage + 1)));
      if (hasMoreUpcoming)
        promises.push(dispatch(fetchUpcomingMovies(upcomingPage + 1)));
      if (hasMoreNowPlaying)
        promises.push(dispatch(fetchNowPlayingMovies(nowPlayingPage + 1)));

      Promise.all(promises)
        .then(() => {
          if (hasMorePopular) setPopularPage(prev => prev + 1);
          if (hasMoreUpcoming) setUpcomingPage(prev => prev + 1);
          if (hasMoreNowPlaying) setNowPlayingPage(prev => prev + 1);
        })
        .finally(() => {
          setIsSearchLoading(false);
        });
    }
  }, [
    dispatch,
    popularPage,
    upcomingPage,
    nowPlayingPage,
    isSearchLoading,
    loading,
    hasMorePopular,
    hasMoreUpcoming,
    hasMoreNowPlaying,
    hasMoreSearch,
  ]);

  // Debounce search results loading to prevent rapid API calls
  const debouncedLoadMoreSearchResults = useMemo(
    () => debounce(loadMoreSearchResults, 500),
    [loadMoreSearchResults],
  );

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPopularPage(1);
    setUpcomingPage(1);
    setNowPlayingPage(1);
    refreshMovies();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshMovies]);

  // Normalize movie data for consistent rendering
  const normalizeMovies = useCallback((movies, source) => {
    return movies.map(movie => ({
      id: `${source}_${movie.id.toString()}`, // Unique ID with source prefix
      originalId: movie.id.toString(),
      title: movie.name || movie.title || movie.original_name || 'Unknown',
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : movie.image || 'https://via.placeholder.com/500',
      category: movie.genre_ids?.includes(18)
        ? 'Movies'
        : movie.category || 'Shows',
    }));
  }, []);

  // Memoized filtered and sorted movie lists to optimize performance
  const filteredPopularMovies = useMemo(
    () =>
      sortMovies(
        filterMovies(
          normalizeMovies(popularMovies, 'popular'),
          searchQuery,
          selectedCategory,
        ),
        sortOrder,
      ),
    [popularMovies, searchQuery, selectedCategory, sortOrder, normalizeMovies],
  );

  const filteredUpcomingMovies = useMemo(
    () =>
      sortMovies(
        filterMovies(
          normalizeMovies(upcomingMovies, 'upcoming'),
          searchQuery,
          selectedCategory,
        ),
        sortOrder,
      ),
    [upcomingMovies, searchQuery, selectedCategory, sortOrder, normalizeMovies],
  );

  const filteredNowPlayingMovies = useMemo(
    () =>
      sortMovies(
        filterMovies(
          normalizeMovies(nowPlayingMovies, 'nowPlaying'),
          searchQuery,
          selectedCategory,
        ),
        sortOrder,
      ),
    [
      nowPlayingMovies,
      searchQuery,
      selectedCategory,
      sortOrder,
      normalizeMovies,
    ],
  );

  // Combine and deduplicate search results
  const searchResults = useMemo(
    () =>
      sortMovies(
        Array.from(
          new Map(
            [
              ...filteredPopularMovies,
              ...filteredUpcomingMovies,
              ...filteredNowPlayingMovies,
            ].map(movie => [movie.id, movie]),
          ).values(),
        ),
        sortOrder,
      ),
    [
      filteredPopularMovies,
      filteredUpcomingMovies,
      filteredNowPlayingMovies,
      sortOrder,
    ],
  );

  // Animated style for search options panel
  const animatedSearchOptionsStyle = useAnimatedStyle(() => ({
    transform: [{translateY: slideAnim.value}],
    opacity: fadeAnim.value,
  }));

  // Render error state if API fails
  if (error) {
    return (
      <View
        style={[
          styles.errorContainer,
          {backgroundColor: theme.backgroundColor},
        ]}>
        <Text style={[styles.errorText, {color: theme.textColor}]}>
          Error loading movies. Please try again.
        </Text>
        <TouchableOpacity
          style={[styles.retryButton, {backgroundColor: theme.accentColor}]}
          onPress={refreshMovies}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Main UI render
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {/* Status bar configuration */}
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      {/* Header with search bar and filter button */}
      <View style={[styles.header, {top: STATUS_BAR_HEIGHT + 10}]}>
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.searchBackground,
              borderColor: theme.borderColor,
              ...Platform.select({
                ios: {
                  shadowColor: theme.shadowColor,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                },
                android: {
                  elevation: 3,
                },
              }),
            },
          ]}>
          <Ionicons
            name="search-outline"
            size={20}
            color={theme.secondaryTextColor}
            style={styles.searchIcon}
          />
          <TextInput
            ref={searchInputRef}
            style={[styles.searchInput, {color: theme.textColor}]}
            placeholder="Search movies, shows..."
            placeholderTextColor={theme.placeholderTextColor}
            value={searchQuery}
            onChangeText={handleSearchChange}
            testID="search-input"
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: theme.searchBackground,
              borderColor: theme.borderColor,
              ...Platform.select({
                ios: {
                  shadowColor: theme.shadowColor,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                },
                android: {
                  elevation: 3,
                },
              }),
            },
          ]}
          onPress={toggleSearchOptions}
          testID="filter-button">
          <Ionicons
            name={isSearchOptionsVisible ? 'close' : 'filter'}
            size={20}
            color={theme.accentColor}
          />
        </TouchableOpacity>
      </View>

      {/* Search options panel (visible when filter button is pressed) */}
      {isSearchOptionsVisible && (
        <Animated.View
          style={[
            styles.searchOptions,
            animatedSearchOptionsStyle,
            {
              backgroundColor: theme.overlayBackground,
              borderColor: theme.borderColor,
              ...Platform.select({
                ios: {
                  shadowColor: theme.shadowColor,
                  shadowOffset: {width: 0, height: 4},
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                },
                android: {
                  elevation: 5,
                },
              }),
            },
          ]}>
          <Text style={[styles.searchOptionsTitle, {color: theme.textColor}]}>
            Filter & Sort
          </Text>
          {/* Sort options */}
          <View style={styles.sortContainer}>
            <Text style={[styles.sortLabel, {color: theme.textColor}]}>
              Sort by:
            </Text>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOrder === 'default' && styles.sortButtonSelected,
                {
                  backgroundColor: theme.buttonBackground,
                  borderColor: theme.borderColor,
                },
              ]}
              onPress={() => setSortOrder('default')}>
              <Text
                style={[
                  styles.sortText,
                  sortOrder === 'default' && styles.sortTextSelected,
                  {color: theme.textColor},
                ]}>
                Default
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOrder === 'alphabetical' && styles.sortButtonSelected,
                {
                  backgroundColor: theme.buttonBackground,
                  borderColor: theme.borderColor,
                },
              ]}
              onPress={() => setSortOrder('alphabetical')}>
              <Text
                style={[
                  styles.sortText,
                  sortOrder === 'alphabetical' && styles.sortTextSelected,
                  {color: theme.textColor},
                ]}>
                A-Z
              </Text>
            </TouchableOpacity>
          </View>
          {/* Category filter options */}
          <FlatList
            data={TABS}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === item.name &&
                    styles.categoryButtonSelected,
                  {
                    backgroundColor: theme.buttonBackground,
                    borderColor: theme.borderColor,
                  },
                ]}
                onPress={() =>
                  setSelectedCategory(
                    item.name === selectedCategory ? null : item.name,
                  )
                }>
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={
                    selectedCategory === item.name ? '#fff' : theme.accentColor
                  }
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item.name &&
                      styles.categoryTextSelected,
                    {color: theme.textColor},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.categoryContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>
      )}

      {/* Main content area with pull-to-refresh */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingTop: STATUS_BAR_HEIGHT + 70, flexGrow: 1},
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.accentColor}
            colors={[theme.accentColor]}
          />
        }>
        {/* Render search results or movie sections */}
        {searchQuery ? (
          <Section
            title="Search Results"
            data={searchResults}
            loading={isSearchLoading || loading}
            error={error}
            onEndReached={
              hasMoreSearch && searchResults.length > 5
                ? debouncedLoadMoreSearchResults
                : null
            }
            theme={theme}
            navigation={MOVIE_DETAIL_PAGE_NAVIGATION}
            hasMore={hasMoreSearch}
            refreshInterval={30000}
          />
        ) : (
          <>
            {/* Featured movies slider */}
            <FeaturedSlider
              theme={theme}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
            {/* Popular movies section */}
            <Section
              title="Popular Now"
              data={filteredPopularMovies}
              loading={isPopularLoading || loading}
              error={error}
              onEndReached={hasMorePopular ? loadMorePopular : null}
              theme={theme}
              navigation={MOVIE_DETAIL_PAGE_NAVIGATION}
              hasMore={hasMorePopular}
              refreshInterval={30000}
            />
            {/* Upcoming movies section */}
            <Section
              title="Upcoming"
              data={filteredUpcomingMovies}
              loading={isUpcomingLoading || loading}
              error={error}
              onEndReached={hasMoreUpcoming ? loadMoreUpcoming : null}
              theme={theme}
              navigation={MOVIE_DETAIL_PAGE_NAVIGATION}
              hasMore={hasMoreUpcoming}
              refreshInterval={30000}
            />
            {/* Now playing movies section */}
            <Section
              title="Now Playing"
              data={filteredNowPlayingMovies}
              loading={isNowPlayingLoading || loading}
              error={error}
              onEndReached={hasMoreNowPlaying ? loadMoreNowPlaying : null}
              theme={theme}
              navigation={MOVIE_DETAIL_PAGE_NAVIGATION}
              hasMore={hasMoreUpcoming} // Note: Possible bug, should be hasMoreNowPlaying
              refreshInterval={30000}
            />
          </>
        )}
      </ScrollView>
      {/* Spacer for bottom padding */}
      <View style={{height: 50}} />
    </View>
  );
}