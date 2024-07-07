import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/signin');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/sch icon.jpg')} // Adjust the path as needed
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>K-scholar</Text>
      <Text style={styles.subtitle}>Your scholarship at your fingertips</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#228B22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: height * 0.3,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 10,
  },
});

export default SplashScreen;