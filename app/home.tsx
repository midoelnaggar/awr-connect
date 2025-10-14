import { ThemedText } from "@/components/themed-text";
import { AppDispatch, AppState } from "@/store";
import { logout } from "@/store/slices/userSlice";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const { userDetails } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View style={styles.container}>
      <ThemedText onPress={() => dispatch(logout())}>{userDetails?.name}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
