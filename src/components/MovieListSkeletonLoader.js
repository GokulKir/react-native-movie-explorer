import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';

const MovieListSkeletonLoader = ({ type, theme }) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 1000 }),
      ),
      -1,
    );
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(224, 224, 224, ${0.5 + shimmer.value * 0.5})`,
  }));

  const stylesByType = {
    movieCard: {
      container: {
        width: 110,
        marginRight: 12,
      },
      image: {
        width: '100%',
        height: 160,
        borderRadius: 8,
      },
      title: {
        width: '80%',
        height: 14,
        borderRadius: 4,
        marginTop: 8,
      },
      category: {
        width: '60%',
        height: 12,
        borderRadius: 4,
        marginTop: 4,
      },
    },
    featured: {
      container: {
        width: styles.width - 32,
        height: 200,
        borderRadius: 12,
        marginHorizontal: 4,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
      },
      overlay: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12,
      },
      title: {
        width: '70%',
        height: 20,
        borderRadius: 4,
        marginBottom: 4,
      },
      subtitle: {
        width: '50%',
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      button: {
        width: 100,
        height: 32,
        borderRadius: 20,
      },
    },
  };

  const style = stylesByType[type] || stylesByType.movieCard;

  if (type === 'featured') {
    return (
      <View
        style={[
          style.container,
          {
            ...Platform.select({
              ios: {
                shadowColor: theme.shadowColor,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              },
              android: {
                elevation: 4,
              },
            }),
          },
        ]}>
        <Animated.View style={[style.image, animatedStyle]} />
        <View style={style.overlay}>
          <Animated.View style={[style.title, animatedStyle]} />
          <Animated.View style={[style.subtitle, animatedStyle]} />
          <Animated.View style={[style.button, animatedStyle]} />
        </View>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Animated.View style={[style.image, animatedStyle]} />
      <Animated.View style={[style.title, animatedStyle]} />
      <Animated.View style={[style.category, animatedStyle]} />
    </View>
  );
};

export default MovieListSkeletonLoader;