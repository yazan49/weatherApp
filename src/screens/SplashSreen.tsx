import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {backgroundColor} from '../constants/costants';
import {useNavigation} from '@react-navigation/native';

export default function SplashScreen() {
  const navigation: any = useNavigation();
  const handleAnimationFinish = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.main}>
      <LottieView
        source={require('../assets/animation/cloud.json')}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
