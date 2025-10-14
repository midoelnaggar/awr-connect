import { calculateDuration, formatDate } from "@/helpers";
import { useLazyGetTripQuery } from "@/store/api";
import { TripParams } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Trip = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<TripParams>();
  const [getTrip, { data, isFetching }] = useLazyGetTripQuery();

  useEffect(() => {
    if (!!id) {
      getTrip({ id });
    }
  }, [id, getTrip]);

  const showMap = () => {
    router.navigate({
      pathname: "/trip/[id]/map-view",
      params: { id },
    });
  };

  return isFetching ? (
    <View style={styles.loading}>
      <ActivityIndicator size={"large"} color={"black"} />
    </View>
  ) : !!data ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>Trip Details</Text>
            <Text style={styles.cardDescription}>Trip ID: {data.id}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.row}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <FontAwesome name="map" size={20} color="black" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.label}>Start Location</Text>
                <Text style={styles.value}>{data.startLocation}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <FontAwesome name="map" size={20} color="black" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.label}>End Location</Text>
                <Text style={styles.value}>{data.endLocation}</Text>
              </View>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <FontAwesome name="clock-o" size={20} color="black" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.label}>Started At</Text>
                <Text style={styles.value}>{formatDate(data.startedAt)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <FontAwesome name="clock-o" size={20} color="black" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.label}>Duration</Text>
                <Text style={styles.value}>
                  {calculateDuration(data.startedAt, data.endedAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <FontAwesome name="user" size={18} color="black" />
            <Text style={styles.cardTitle}>Driver Information</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{data.driver.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={[styles.value, styles.smallText]}>
              {data.driver.email}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Role</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>{data.driver.role}</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <FontAwesome name="car" size={18} color="black" />
            <Text style={styles.cardTitle}>Vehicle Information</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Model</Text>
            <Text style={styles.value}>{data.vehicle.model}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Plate Number</Text>
            <Text style={styles.value}>{data.vehicle.plateNumber}</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <MaterialIcons name="my-location" size={20} color="black" />
            <Text style={styles.cardTitle}>Location Tracking</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription}>
            Real-time location points during the trip
          </Text>
          {data.locationPoints.map((point, index) => (
            <View key={point.id} style={styles.locationPoint}>
              <View style={styles.locationHeader}>
                <View style={styles.pointNumber}>
                  <Text style={styles.pointNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationCoords}>
                    {point.latitude.toFixed(3)}, {point.longitude.toFixed(3)}
                  </Text>
                  <Text style={styles.locationTime}>
                    {formatDate(point.timestamp)}
                  </Text>
                </View>
              </View>
              <View style={styles.speedContainer}>
                <MaterialIcons name="speed" size={16} color="black" />
                <Text style={styles.speedText}>{point.speed} km/h</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.mapView} onPress={showMap}>
            <Text style={styles.mapViewText}>Show on map</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lastCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Timestamps</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Created</Text>
            <Text style={[styles.value, styles.smallText]}>
              {formatDate(data.createdAt)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Last Updated</Text>
            <Text style={[styles.value, styles.smallText]}>
              {formatDate(data.updatedAt)}
            </Text>
          </View>
        </View>
      </View>
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
    padding: 16,
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
    color: "black",
  },
  cardDescription: {
    fontSize: 14,
    color: "black",
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
    color: "black",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
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
    color: "black",
  },
  locationInfo: {},
  locationPoint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: "black",
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
  mapView: {
    alignSelf: "flex-end",
  },
  mapViewText: {
    fontSize: 16,
    fontWeight: 500,
    textDecorationLine: "underline",
  },
  locationCoords: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
  locationTime: {
    fontSize: 12,
    color: "black",
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
    color: "black",
  },
});
