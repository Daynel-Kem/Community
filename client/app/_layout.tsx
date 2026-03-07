import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="landing" options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="class-details" options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animationEnabled: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
