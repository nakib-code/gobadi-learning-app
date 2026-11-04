
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../store/authSlice";
import { api } from "../store/api";
import { removeToken } from "../lib/secure-storage";
import { useGetProfileQuery } from "../store/profileApi";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loggingOut, setLoggingOut] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const { data, isLoading, error, refetch } = useGetProfileQuery();

  const profile = data?.data ?? user;

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            setLoggingOut(true);

            await removeToken();

            dispatch(logout());
            dispatch(api.util.resetApiState());

            router.replace("/login");
          } catch {
            setLoggingOut(false);
            Alert.alert("Error", "Unable to logout. Try again.");
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </SafeAreaView>
    );
  }

  if (error && !user) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Ionicons name="cloud-offline-outline" size={48} color="#EF4444" />

        <Text style={styles.errorTitle}>Something went wrong</Text>

        <Text style={styles.errorText}>
          We couldn't load your profile. Please try again.
        </Text>

        <Pressable style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.topBar}>
          <Text style={styles.screenTitle}>My Profile</Text>

          <Pressable style={styles.iconButton}>
            <Ionicons name="settings-outline" size={22} color="#1F2937" />
          </Pressable>
        </View>

        {/* Profile Header */}
        <LinearGradient
          colors={["#6C63FF", "#8B5CF6", "#A855F7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeader}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <Text style={styles.userName}>
            {profile?.name ?? "User"}
          </Text>

          <Text style={styles.userEmail}>
            {profile?.email ?? "No email available"}
          </Text>

          <View style={styles.memberBadge}>
            <Ionicons name="checkmark-circle" size={15} color="#FFFFFF" />
            <Text style={styles.memberText}>Active Account</Text>
          </View>
        </LinearGradient>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="person-outline" size={21} color="#6C63FF" />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>
                  {profile?.name ?? "Not available"}
                </Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="mail-outline" size={21} color="#6C63FF" />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email Address</Text>
                <Text style={styles.infoValue}>
                  {profile?.email ?? "Not available"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <View style={styles.infoCard}>
            <Pressable style={styles.menuRow}>
              <View style={styles.menuIcon}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#374151"
                />
              </View>

              <Text style={styles.menuText}>Change Password</Text>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#9CA3AF"
              />
            </Pressable>

            <View style={styles.separator} />

            <Pressable style={styles.menuRow}>
              <View style={styles.menuIcon}>
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#374151"
                />
              </View>

              <Text style={styles.menuText}>Help & Support</Text>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          </View>
        </View>

        {/* Logout */}
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <ActivityIndicator color="#EF4444" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={21} color="#EF4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.footerText}>Made with care ❤️</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 35,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 14,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 16,
  },
  errorText: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
  },
  retryButton: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111827",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeader: {
    borderRadius: 24,
    padding: 26,
    alignItems: "center",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.35)",
  },
  avatarText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#6C63FF",
  },
  userName: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  userEmail: {
    fontSize: 14,
    color: "#EDE9FE",
    marginTop: 6,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 15,
  },
  memberText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 14,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#F1EFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContent: {
    marginLeft: 13,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#94A3B8",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
  },
  menuIcon: {
    width: 40,
    alignItems: "center",
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 8,
  },
  logoutButton: {
    marginTop: 30,
    height: 54,
    borderRadius: 15,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FEE2E2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EF4444",
  },
  footerText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 25,
  },
});
