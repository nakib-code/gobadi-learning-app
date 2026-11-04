
import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // Login handler
  const handleLogin = async () => {
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setIsLoading(true);

      // Connect your login API here
      Alert.alert(
        'Login',
        'Connect your authentication API here.'
      );

    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Heading */}
          <Text style={styles.title}>Sign In</Text>

          <Text style={styles.subtitle}>
            Welcome back! Please sign in to continue.
          </Text>

          {/* Form */}
          <View style={styles.form}>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>

              <TextInput
                style={styles.emailInput}
                value={email}
                onChangeText={setEmail}
                placeholder="johndoe@email.com"
                placeholderTextColor="#A39E99"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#A39E99"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={22}
                    color="#A39E99"
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              {/* <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => router.push('/forgot')}
              > */}
                {/* <Text style={styles.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity> */}
            </View>

            {/* Remember Me */}
            <TouchableOpacity
              style={styles.rememberMeRow}
              activeOpacity={0.7}
              onPress={() => setRememberMe((v) => !v)}
            >
              <View
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxChecked,
                ]}
              >
                {rememberMe && (
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color="#FFFFFF"
                  />
                )}
              </View>

              <Text style={styles.rememberMeText}>
                Keep me signed in
              </Text>
            </TouchableOpacity>

            {/* Error Message */}
            {errorMessage ? (
              <Text style={styles.errorText}>
                {errorMessage}
              </Text>
            ) : null}

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              activeOpacity={0.8}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}

                <Text
                  style={styles.signUpLink}
                  onPress={() => router.push('/signup')}
                >
                  Sign Up
                </Text>
              </Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#BD632F',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1817',
    alignSelf: 'flex-start',
    marginBottom: 24,
  },

  form: {
    width: '100%',
  },

  inputGroup: {
    marginBottom: 16,
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1817',
    marginBottom: 8,
  },

  emailInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E1DC',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1817',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E1DC',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1A1817',
  },

  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },

  forgotPasswordText: {
    color: '#BD632F',
    fontSize: 13,
    fontWeight: '600',
  },

  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#BD632F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  checkboxChecked: {
    backgroundColor: '#BD632F',
  },

  rememberMeText: {
    fontSize: 14,
    color: '#1A1817',
    fontWeight: '500',
  },

  errorText: {
    color: '#E53935',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },

  loginButton: {
    backgroundColor: '#BD632F',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  loginButtonDisabled: {
    opacity: 0.7,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  footerContainer: {
    marginTop: 24,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    color: '#9C9690',
  },

  signUpLink: {
    color: '#BD632F',
    fontWeight: '600',
  },
});
