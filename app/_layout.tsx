import { Slot } from 'expo-router';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import SafeScreen from '../components/SafeScreen';

SplashScreen.preventAutoHideAsync(); // Keep splash visible until ready

const clerkKey = Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY;

if (!clerkKey) {
  console.warn("⚠️ Clerk publishableKey is missing. Did you set it in .env and app.config.ts?");
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
      <AuthGate />
    </ClerkProvider>
  );
}

// This gate waits until Clerk has fully loaded
function AuthGate() {
  const { isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <SafeScreen>
      <Slot />
    </SafeScreen>
  );
}
