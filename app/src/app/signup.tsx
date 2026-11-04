
import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View>
          <Image
            source={require('@/assets/images/splash-icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.form}>
          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#A39E99"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#A39E99"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Role */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Your Role</Text>

            <TouchableOpacity
              style={styles.dropdownSelector}
              activeOpacity={1}
            >
              <Text style={styles.placeholderText}>
                Select your role
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••••••"
                placeholderTextColor="#A39E99"
                secureTextEntry
              />

              <View style={styles.eyeIcon}>
                <Ionicons
                  name="eye-off-outline"
                  size={20}
                  color="#A39E99"
                />
              </View>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••••••"
                placeholderTextColor="#A39E99"
                secureTextEntry
              />

              <View style={styles.eyeIcon}>
                <Ionicons
                  name="eye-off-outline"
                  size={20}
                  color="#A39E99"
                />
              </View>
            </View>
          </View>

          {/* BVC Registration Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              BVC Registration Number
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your BVC number"
              placeholderTextColor="#A39E99"
              keyboardType="number-pad"
            />
          </View>

          {/* Terms */}
          <View style={styles.termsRow}>
            <View style={styles.checkbox} />

            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsHighlight}>
                Terms of Service
              </Text>
            </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signUpButton}
            activeOpacity={1}
          >
            <Text style={styles.signUpButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.signInLink}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },

  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#BD632F',
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

  input: {
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
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1817',
  },

  eyeIcon: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: '100%',
  },

  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E1DC',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
  },

  dropdownArrow: {
    fontSize: 10,
    color: '#7C7672',
  },

  placeholderText: {
    fontSize: 16,
    color: '#A39E99',
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#A39E99',
    marginRight: 8,
  },

  termsText: {
    fontSize: 13,
    color: '#9C9690',
    flex: 1,
  },

  termsHighlight: {
    color: '#BD632F',
    fontWeight: '600',
  },

  signUpButton: {
    backgroundColor: '#BD632F',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  footerContainer: {
    marginTop: 12,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    color: '#9C9690',
  },

  signInLink: {
    color: '#BD632F',
    fontWeight: '600',
  },
});
