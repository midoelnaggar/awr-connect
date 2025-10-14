import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { calculateDuration, formatDate } from "@/helpers";
import { useLazyGetTripQuery } from "@/store/api";
import { TripParams } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

const Trip = () => {
  const { id } = useLocalSearchParams<TripParams>();

  const [getTrip, { data, isFetching }] = useLazyGetTripQuery();

  useEffect(() => {
    if (!!id) {
      getTrip({ id: id });
    }
  }, [id, getTrip]);

  return isFetching ? (
    <ThemedView style={styles.loading}>
      <ActivityIndicator size={"large"} />
    </ThemedView>
  ) : !!data ? (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <ThemedView>
        <ThemedView style={styles.cardHeader}>
          <ThemedView>
            <ThemedText style={styles.cardTitle}>Trip Details</ThemedText>
            <ThemedText style={styles.cardDescription}>
              Trip ID: {data.id}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.cardContent}>
          <ThemedView style={styles.row}>
            <ThemedView style={styles.infoItem}>
              <ThemedView style={styles.iconContainer}>
                <FontAwesome name="map" size={20} color="#6B7280" />
              </ThemedView>
              <ThemedView style={styles.infoContent}>
                <ThemedText style={styles.label}>Start Location</ThemedText>
                <ThemedText style={styles.value}>
                  {data.startLocation}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.row}>
            <ThemedView style={styles.infoItem}>
              <ThemedView style={styles.iconContainer}>
                <FontAwesome name="map" size={20} color="#6B7280" />
              </ThemedView>
              <ThemedView style={styles.infoContent}>
                <ThemedText style={styles.label}>End Location</ThemedText>
                <ThemedText style={styles.value}>{data.endLocation}</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.separator} />

          <ThemedView style={styles.row}>
            <ThemedView style={styles.infoItem}>
              <ThemedView style={styles.iconContainer}>
                <FontAwesome name="clock-o" size={20} color="#6B7280" />
              </ThemedView>
              <ThemedView style={styles.infoContent}>
                <ThemedText style={styles.label}>Started At</ThemedText>
                <ThemedText style={styles.value}>
                  {formatDate(data.startedAt)}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.row}>
            <ThemedView style={styles.infoItem}>
              <ThemedView style={styles.iconContainer}>
                <FontAwesome name="clock-o" size={20} color="#6B7280" />
              </ThemedView>
              <ThemedView style={styles.infoContent}>
                <ThemedText style={styles.label}>Duration</ThemedText>
                <ThemedText style={styles.value}>
                  {calculateDuration(data.startedAt, data.endedAt)}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedView style={styles.cardHeader}>
          <ThemedView style={styles.cardTitleContainer}>
            <FontAwesome name="user" size={18} color="#374151" />
            <ThemedText style={styles.cardTitle}>Driver Information</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.cardContent}>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Name</ThemedText>
            <ThemedText style={styles.value}>{data.driver.name}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <ThemedText style={[styles.value, styles.smallText]}>
              {data.driver.email}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Role</ThemedText>
            <ThemedView style={styles.roleBadge}>
              <ThemedText style={styles.roleBadgeText}>
                {data.driver.role}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedView style={styles.cardHeader}>
          <ThemedView style={styles.cardTitleContainer}>
            <FontAwesome name="car" size={18} color="#374151" />
            <ThemedText style={styles.cardTitle}>
              Vehicle Information
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.cardContent}>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Model</ThemedText>
            <ThemedText style={styles.value}>{data.vehicle.model}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Plate Number</ThemedText>
            <ThemedText style={styles.value}>
              {data.vehicle.plateNumber}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedView style={styles.cardHeader}>
          <ThemedView style={styles.cardTitleContainer}>
            <MaterialIcons name="my-location" size={20} color="#374151" />
            <ThemedText style={styles.cardTitle}>Location Tracking</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.cardContent}>
          <ThemedText style={styles.cardDescription}>
            Real-time location points during the trip
          </ThemedText>
          {data.locationPoints.map((point, index) => (
            <ThemedView key={point.id} style={styles.locationPoint}>
              <ThemedView style={styles.locationHeader}>
                <ThemedView style={styles.pointNumber}>
                  <ThemedText style={styles.pointNumberText}>
                    {index + 1}
                  </ThemedText>
                </ThemedView>
                <ThemedView style={styles.locationInfo}>
                  <ThemedText style={styles.locationCoords}>
                    {point.latitude.toFixed(3)}, {point.longitude.toFixed(3)}
                  </ThemedText>
                  <ThemedText style={styles.locationTime}>
                    {formatDate(point.timestamp)}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.speedContainer}>
                <MaterialIcons name="speed" size={16} color="#6B7280" />
                <ThemedText style={styles.speedText}>
                  {point.speed} km/h
                </ThemedText>
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.lastCard}>
        <ThemedView style={styles.cardHeader}>
          <ThemedText style={styles.cardTitle}>Timestamps</ThemedText>
        </ThemedView>
        <ThemedView style={styles.cardContent}>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Created</ThemedText>
            <ThemedText style={[styles.value, styles.smallText]}>
              {formatDate(data.createdAt)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Last Updated</ThemedText>
            <ThemedText style={[styles.value, styles.smallText]}>
              {formatDate(data.updatedAt)}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  ) : null;
};

export default Trip;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#F9FAFB",
    padding:16
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  lastCard: {
    marginBottom: 32,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  cardContent: {
    padding: 16,
  },
  row: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  smallText: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  roleBadge: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },
  locationPoint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointNumber: {
    width: 32,
    height: 32,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  pointNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  locationInfo: {
  },
  locationCoords: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  locationTime: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  speedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  speedText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
});
