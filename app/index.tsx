import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '../constants/Colors';
import { router } from 'expo-router';

const SignInScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    // Here you would typically handle the authentication logic
    // For now, we'll just navigate to the tabs
    router.replace('/(tabs)');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>K-Scholar</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to K-Scholar</Text>
        <Text style={styles.subtitle}>Login to your account or create a new one</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, isLogin ? styles.activeToggle : {}]}
            onPress={() => setIsLogin(true)}>
            <Text style={styles.toggleText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, !isLogin ? styles.activeToggle : {}]}
            onPress={() => setIsLogin(false)}>
            <Text style={styles.toggleText}>Register</Text>
          </TouchableOpacity>
        </View>

        {isLogin ? (
          <View>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </View>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        ) : (
          <View>
            <TextInput style={styles.input} placeholder="Full Name" />
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}</View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e0f2e0',
  },
  header: {
    backgroundColor: '#006400',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#02B200',
  },
  toggleText: {
    color: '#006400',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#006400',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  forgotPassword: {
    color: '#006400',
    textAlign: 'right',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#02B200',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#006400',
    fontWeight: 'bold',
  },
});

export default SignInScreen;