import { Stack } from "expo-router";

function RootNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />

      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
export default function RootLayout() {
  return <RootNavigator />;
}
