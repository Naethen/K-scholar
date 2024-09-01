import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FirebaseError } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxV7TgKzIINlfx12bITCZ36F143oWPLls",
  authDomain: "k-scholar.firebaseapp.com",
  projectId: "k-scholar",
  storageBucket: "k-scholar.appspot.com",
  messagingSenderId: "836605679601",
  appId: "1:836605679601:web:b958beefd5336bbaa49650",
  measurementId: "G-6P1NJG6GKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const SignInScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // State for full name in registration
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password in registration
  const [loginErrorMessage, setLoginErrorMessage] = useState(''); // State for login errors
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState(''); // State for registration errors
  const [resetEmail, setResetEmail] = useState(''); // State for password reset email
  const [isResetModalVisible, setIsResetModalVisible] = useState(false); // State for modal visibility
  const [rememberMe, setRememberMe] = useState(false); // State for remember me checkbox
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [agreedToTerms, setAgreedToTerms] = useState(false); // State for terms checkbox
  const router = useRouter();

  useEffect(() => {
    const loadRememberMe = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('rememberedEmail');
        if (storedEmail) {
          setEmail(storedEmail);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Failed to load remember me state', error);
      }
    };

    loadRememberMe();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    if (isLogin) {
      setLoginErrorMessage('');
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          await AsyncStorage.setItem('userFirstName', userData.firstName);
        }
        console.log("Logged in as:", user.email);
        router.replace('/(tabs)');
      } catch (error) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/user-not-found':
              setLoginErrorMessage('User not found');
              break;
            case 'auth/wrong-password':
              setLoginErrorMessage('Email or password wrong');
              break;
            default:
              setLoginErrorMessage('Invalid Credentials');
          }
        } else {
          setLoginErrorMessage('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    } else {
      if (!agreedToTerms) {
        setRegistrationErrorMessage('You must agree to the terms and conditions to register.');
        setLoading(false); // Hide loading indicator
        return;
      }
      if (password !== confirmPassword) {
        setRegistrationErrorMessage('Passwords do not match.');
        setLoading(false); // Hide loading indicator
        return;
      }

      setRegistrationErrorMessage('');
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const db = getFirestore();
        const firstName = fullName.split(' ')[0];
        await setDoc(doc(db, 'users', user.uid), {
          firstName: firstName,
          lastName: fullName.split(' ')[1] || '',
          email: email,
          phoneNumber: ''
        });
        await AsyncStorage.setItem('userFirstName', firstName);
        console.log("Registered as:", user.email);
        router.replace('/(tabs)');
      } catch (error) {
        if (error instanceof Error) {
          setRegistrationErrorMessage('Error registering: ' + error.message);
        } else {
          setRegistrationErrorMessage('An unknown error occurred during registration');
        }
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }
  };

  const handleToggle = (login: boolean) => {
    setIsLogin(login);
    // Clear the error message of the currently hidden form
    if (login) {
      setRegistrationErrorMessage('');
    } else {
      setLoginErrorMessage('');
    }
  };

  const handleForgotPassword = async () => {
    setIsResetModalVisible(true); // Show the password reset modal
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true); // Show loading indicator
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert('Password Reset', 'Password reset email sent successfully.');
      setIsResetModalVisible(false); // Close the modal
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', 'Failed to send password reset email: ' + error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred while sending password reset email');
      }
    } finally {
      setLoading(false); // Hide loading indicator
    }
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
            onPress={() => handleToggle(true)}
          >
            <Text style={styles.toggleText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, !isLogin ? styles.activeToggle : {}]}
            onPress={() => handleToggle(false)}
          >
            <Text style={styles.toggleText}>Register</Text>
          </TouchableOpacity>
        </View>
        {isLogin ? (
          <View>
            {loginErrorMessage ? (
              <Text style={styles.errorMessage}>{loginErrorMessage}</Text> // Display login error message
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, rememberMe ? styles.checkboxChecked : {}]}
                onPress={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && <View style={styles.checkboxInner} />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {registrationErrorMessage ? (
              <Text style={styles.errorMessage}>{registrationErrorMessage}</Text> // Display registration error message
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, agreedToTerms ? styles.checkboxChecked : {}]}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                {agreedToTerms && <View style={styles.checkboxInner} />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#02B200" />
          </View>
        )}
      </View>

      {/* Password Reset Modal */}
      <Modal
        visible={isResetModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsResetModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={resetEmail}
              onChangeText={setResetEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
              <Text style={styles.buttonText}>Send Reset Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsResetModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    textAlign: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#006400',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 3,
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
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default SignInScreen;
