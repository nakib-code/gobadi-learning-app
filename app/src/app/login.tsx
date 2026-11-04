
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useLoginMutation } from "../store/authApi";
import { saveToken } from "../lib/secure-storage";
import { setCredentials } from "../store/authSlice";
import { useAppDispatch } from "../hooks/redux";
import { useRouter, Link } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      // Save JWT token
      await saveToken(response.data.token);

      // Save user information in Redux
      dispatch(setCredentials(response.data.user));

      Alert.alert("Success", "Login successful");

      // Navigate to profile
      router.replace("/profile");

    } catch (error) {
      console.log("Login error:", error);

      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <View style={styles.footer}>
        <Text>Don't have an account?</Text>
        <Link href="/register">Sign Up</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});
