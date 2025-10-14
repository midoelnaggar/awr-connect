import { AuthProvider } from "@/providers/AuthProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <StoreProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="trip/[id]/index"
                options={({ route }) => ({
                  headerShown: true,
                  title: "Trip Preview",
                  headerBackTitle: "Back",
                  presentation: "card",
                })}
              />
              <Stack.Screen
                name="trip/[id]/map-view"
                options={({ route }) => ({
                  headerShown: true,
                  title: "Map View",
                  headerBackTitle: "Back",
                  presentation: "modal",
                })}
              />
            </Stack>
            <ToastManager />
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </AuthProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
