import { useLazyGetTripQuery } from "@/store/api";
import { TripParams } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function TripMapScreen() {
  const { id } = useLocalSearchParams<TripParams>();

  const [getTrip, { data, isLoading }] = useLazyGetTripQuery();

  useEffect(() => {
    if (id) {
      getTrip({ id: id });

      const intervalId = setInterval(() => {
        getTrip({ id: id });
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [id, getTrip]);

  if (isLoading && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={"large"} color={"black"} />
      </View>
    );
  }

  const coordinates = data?.locationPoints?.map((p) => ({
    latitude: p.latitude,
    longitude: p.longitude,
  }));

  if (!coordinates?.length) {
    return (
      <View style={styles.center}>
        <Text>No location data available</Text>
      </View>
    );
  }

  const start = coordinates[0];
  const end = coordinates[coordinates.length - 1];

  const latitudes = coordinates.map((c) => c.latitude);
  const longitudes = coordinates.map((c) => c.longitude);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);

  const region = {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLon + maxLon) / 2,
    latitudeDelta: Math.max(0.01, (maxLat - minLat) * 1.2),
    longitudeDelta: Math.max(0.01, (maxLon - minLon) * 1.2),
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        <Marker
          coordinate={start}
          title="Trip Start"
          description={data?.vehicle?.plateNumber || "Start Location"}
          pinColor="green"
        />

        <Marker
          coordinate={end}
          title="Current Location"
          description={data?.vehicle?.plateNumber || "Current Position"}
          pinColor="red"
        />

        <Polyline
          coordinates={coordinates}
          strokeColor="#3B82F6"
          strokeWidth={4}
          lineDashPattern={[0]}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  updateIndicator: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  updateText: {
    color: "white",
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "500",
  },
});