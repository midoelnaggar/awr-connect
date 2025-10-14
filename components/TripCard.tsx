import { formatDate, getStatusColor } from "@/helpers";
import { TripListItemResponse } from "@/types";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface Props {
  trip: TripListItemResponse;
}

const TripCard = ({ trip }: Props) => {
  const router = useRouter();
  const onPress = () => {
    router.navigate({
      pathname: "/trip/[id]",
      params: { id: trip.id },
    });
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ThemedView style={styles.cardHeader}>
        <ThemedView style={styles.vehicleInfo}>
          <ThemedText style={styles.vehicleModel}>
            {trip.vehicleModel}
          </ThemedText>
          <ThemedText style={styles.plateNumber}>
            {trip.vehiclePlateNumber}
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(trip.status) },
          ]}
        >
          <ThemedText style={styles.statusText}>
            {trip.status.replace("_", " ")}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.locationContainer}>
        <ThemedView style={styles.locationRow}>
          <ThemedView style={styles.locationDot} />
          <ThemedView style={styles.locationInfo}>
            <ThemedText style={styles.locationLabel}>From</ThemedText>
            <ThemedText style={styles.locationText}>
              {trip.startLocation}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.locationLine} />

        <ThemedView style={styles.locationRow}>
          <ThemedView style={[styles.locationDot, styles.destinationDot]} />
          <ThemedView style={styles.locationInfo}>
            <ThemedText style={styles.locationLabel}>To</ThemedText>
            <ThemedText style={styles.locationText}>
              {trip.endLocation}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.cardFooter}>
        <ThemedView style={styles.timeInfo}>
          <ThemedText style={styles.timeLabel}>Started</ThemedText>
          <ThemedText style={styles.timeText}>
            {formatDate(trip.startedAt)}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleModel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  plateNumber: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3B82F6",
    marginRight: 12,
  },
  destinationDot: {
    backgroundColor: "#EF4444",
  },
  locationLine: {
    width: 2,
    height: 24,
    backgroundColor: "#E5E7EB",
    marginLeft: 5,
    marginVertical: 2,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  driverInfo: {
    flex: 1,
  },
  driverLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  driverName: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  timeInfo: {
    alignItems: "flex-end",
  },
  timeLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  timeText: {
    fontSize: 14,
    color: "#1F2937",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
  },
});

export default TripCard;
