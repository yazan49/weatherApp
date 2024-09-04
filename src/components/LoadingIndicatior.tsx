import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {primaryColor} from '../constants/costants';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  indicatorContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
  },
});

export default LoadingIndicator;
