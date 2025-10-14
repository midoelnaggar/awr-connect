import { ThemedView } from "@/components/themed-view";
import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {children}
      </SafeAreaView>
    </ThemedView>
  );
};

export default DefaultLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
