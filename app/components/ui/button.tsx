import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
} from "react-native";

type ButtonProps = PressableProps & {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  disabled = false,
  style,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      style={(state) => [
        styles.base,
        variant === "primary" && styles.primary,
        variant === "ghost" && styles.ghost,
        state.pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === "function" ? style(state) : style,
      ]}
      disabled={disabled}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" && styles.textPrimary,
          variant === "ghost" && styles.textGhost,
          disabled && styles.textDisabled,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#2563EB",
  },
  ghost: {
    backgroundColor: "transparent",
    alignSelf: "flex-start",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textPrimary: {
    color: "#FFFFFF",
  },
  textGhost: {
    color: "#374151",
  },
  textDisabled: {
    color: "#9CA3AF",
  },
});
