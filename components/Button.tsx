import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./themed-text";

interface Props extends TouchableOpacityProps {
  children: string;
  loading?: boolean;
}
const Button = ({
  children,
  style,
  loading = false,
  disabled,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.buttonDisabled]}
      activeOpacity={0.8}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ThemedText style={styles.buttonText}>{children}</ThemedText>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
