import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TripCard from "@/components/TripCard";
import DefaultLayout from "@/providers/DefaultLayout";
import { AppState } from "@/store";
import { useLazyGetMyTripsQuery } from "@/store/api";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const { userDetails } = useSelector((state: AppState) => state.user);
  const [getMyTrips, { data, isFetching }] = useLazyGetMyTripsQuery();

  useEffect(() => {
    if (userDetails?.id) {
      getMyTrips({ driverId: userDetails.id });
    }
  }, [userDetails]);

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerTitle}>
            Welcome, {userDetails?.name}
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>Your trips</ThemedText>
        </ThemedView>
        {isFetching ? (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <TripCard trip={item} />}
            keyExtractor={({ id }) => id}
            ListEmptyComponent={<ThemedText>No results.</ThemedText>}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    gap: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 600,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  separator: {
    height: 12,
  },
});
