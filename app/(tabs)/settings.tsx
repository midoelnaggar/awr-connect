import Button from "@/components/Button";
import DefaultLayout from "@/providers/DefaultLayout";
import { AppDispatch } from "@/store";
import { logout } from "@/store/slices/userSlice";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

export default function SettingsScreen() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Button style={styles.logout} onPress={() => dispatch(logout())}>
          Logout
        </Button>
      </View>
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
