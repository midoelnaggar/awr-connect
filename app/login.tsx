import Button from "@/components/Button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { validateEmail } from "@/helpers";
import { useLazyGetUserQuery } from "@/store/api";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [getUser, { isFetching }] = useLazyGetUserQuery();

  const handleLogin = () => {
    if (!email.trim()) {
      setEmailError("Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    getUser({ email });
  };
  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ThemedView style={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText style={styles.title}>Welcome to AWR Connect</ThemedText>
            <ThemedText style={styles.subtitle}>
              Enter your email to continue
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.form}>
            <ThemedView style={styles.inputContainer}>
              <TextInput
                style={[styles.input, emailError && styles.inputError]}
                placeholder="Email address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!isFetching}
              />
              {emailError ? (
                <ThemedText style={styles.errorText}>{emailError}</ThemedText>
              ) : null}
            </ThemedView>

            <Button
              onPress={handleLogin}
              disabled={!email || isFetching}
              loading={isFetching}
            >
              Login
            </Button>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#1F2937",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    color: "#9CA3AF",
    paddingHorizontal: 16,
    fontSize: 14,
  },
  alternativeButton: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  alternativeButtonText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "500",
  },
  footerText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 32,
  },
});
