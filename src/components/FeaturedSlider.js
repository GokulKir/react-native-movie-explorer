import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {filterMovies} from '../utils/utils';
import {FEATURED_MOVIES} from '../data/featuredMovies';

const AnimatedFlatList = Animated.createAnimatedComponent(Animated.FlatList);
const {width} = Dimensions.get('window');

const FeaturedSlider = ({theme, searchQuery = '', selectedCategory = null}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= FEATURED_MOVIES.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {itemVisiblePercentThreshold: 50};
  const filteredFeaturedMovies = filterMovies(
    FEATURED_MOVIES,
    searchQuery,
    selectedCategory,
  );

  return (
    <View style={styles.featuredContainer}>
      {filteredFeaturedMovies.length > 0 ? (
        <>
          <AnimatedFlatList
            ref={flatListRef}
            data={filteredFeaturedMovies}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View
                style={[
                  styles.featuredItem,
                  {
                    ...Platform.select({
                      ios: {
                        shadowColor: theme.shadowColor,
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                      },
                      android: {
                        elevation: 4,
                      },
                    }),
                  },
                ]}>
                <Image
                  source={{uri: item.image}}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <View style={styles.featuredOverlay}>
                  <View style={styles.featuredTextContainer}>
                    <Text
                      style={[styles.featuredTitle, {color: theme.textColor}]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.featuredSubtitle,
                        {color: theme.secondaryTextColor},
                      ]}>
                      {item.subtitle}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.playButton,
                        {backgroundColor: theme.accentColor},
                      ]}>
                      <Ionicons name="play" size={20} color="#fff" />
                      <Text style={styles.playButtonText}>Watch Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            snapToInterval={width - 32}
            decelerationRate="fast"
          />
          <View style={styles.dotContainer}>
            {filteredFeaturedMovies.map((_, index) => {
              const opacity = scrollX.interpolate({
                inputRange: [
                  (index - 1) * (width - 32),
                  index * (width - 32),
                  (index + 1) * (width - 32),
                ],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.dot,
                    {opacity, backgroundColor: theme.accentColor},
                  ]}
                />
              );
            })}
          </View>
        </>
      ) : (
        <Text style={[styles.noResultsText, {color: theme.secondaryTextColor}]}>
          No featured movies found
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  featuredContainer: {
    marginVertical: 16,
  },
  featuredItem: {
    width: width - 32,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  featuredTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  noResultsText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default FeaturedSlider;
