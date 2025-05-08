import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import styles from './styles';

const SkeletonLoader = ({ theme }) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, {
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(200, 200, 200, ${0.3 + shimmer.value * 0.4})`,
  }));

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Animated.View style={[styles.skeletonImage, animatedStyle]} />
      <View style={styles.skeletonDetails}>
        <Animated.View style={[styles.skeletonTitle, animatedStyle]} />
        <View style={styles.skeletonInfoRow}>
          <Animated.View style={[styles.skeletonInfo, animatedStyle]} />
          <Animated.View style={[styles.skeletonInfo, animatedStyle]} />
        </View>
        <Animated.View style={[styles.skeletonDescription, animatedStyle]} />
        <Animated.View style={[styles.skeletonDescription, animatedStyle]} />
        <View style={styles.skeletonButtonRow}>
          <Animated.View style={[styles.skeletonButton, animatedStyle]} />
          <Animated.View style={[styles.skeletonButton, animatedStyle]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SkeletonLoader;