import Button from "@/components/Button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import DefaultLayout from "@/providers/DefaultLayout";
import { AppDispatch } from "@/store";
import { logout } from "@/store/slices/userSlice";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

export default function SettingsScreen() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DefaultLayout>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Settings</ThemedText>
        <Button style={styles.logout} onPress={() => dispatch(logout())}>
          Logout
        </Button>
      </ThemedView>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 600,
    fontSize: 24,
  },
  logout: {
    marginTop: "auto",
  },
});
