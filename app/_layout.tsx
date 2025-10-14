import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/providers/AuthProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StoreProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="trip/[id]"
                options={({ route }) => ({
                  headerShown: true,
                  title: "Trip Preview",
                  headerBackTitle: "Back",
                  presentation: "card",
                })}
              />
            </Stack>
            <ToastManager />
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </AuthProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
