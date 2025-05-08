import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const ErrorView = ({ theme, error, onRetry }) => (
  <SafeAreaView
    style={[styles.errorContainer, { backgroundColor: theme.backgroundColor }]}
  >
    <Text style={[styles.errorText, { color: theme.textColor }]}>
      Error loading movie details: {error}
    </Text>
    <TouchableOpacity
      style={[styles.retryButton, { backgroundColor: theme.accentColor }]}
      onPress={onRetry}
    >
      <Text style={[styles.buttonText, { color: theme.textColor }]}>Retry</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

export default ErrorView;