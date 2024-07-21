import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(-100)).current;
  const subtitleSlide = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(titleSlide, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.timing(subtitleSlide, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });

    const timer = setTimeout(() => {
      router.replace('/signin');
    }, 7000); // Total time = 3s background + 1s title + 1s subtitle + 2s idle

    return () => clearTimeout(timer);
  }, [backgroundColor, titleSlide, subtitleSlide, router]);

  const backgroundColorInterpolation = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#228B22'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundColorInterpolation }]}>
      <LottieView
        source={require('../assets/images/welcome.json')}
        autoPlay
        loop={false}
        style={styles.animation}
        onAnimationFinish={() => {
          Animated.timing(titleSlide, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start();

          Animated.timing(subtitleSlide, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        }}
      />
      <Animated.Text style={[styles.title, { transform: [{ translateY: titleSlide }] }]}>
        K-scholar
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { transform: [{ translateY: subtitleSlide }] }]}>
        Your scholarship at your fingertips
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: width,
    height: height * 0.4,
    tintColor: '#ffffff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SplashScreen;