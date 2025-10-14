import { useLazyGetTripQuery } from "@/store/api";
import { TripParams } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function TripMapScreen() {
  const { id } = useLocalSearchParams<TripParams>();

  const [getTrip, { data, isFetching }] = useLazyGetTripQuery();

  useEffect(() => {
    if (!!id) {
      getTrip({ id: id });
    }
  }, [id, getTrip]);

  if (isFetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={"large"} color={"black"}/>
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

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...start,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      }}
    >
      <Marker coordinate={start} title="Start" pinColor="green" />
      <Marker coordinate={end} title="End" pinColor="red" />
      <Marker coordinate={end} title="Current Location" pinColor="blue" />
      <Polyline
        coordinates={coordinates}
        strokeColor="black"
        strokeWidth={4}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
