import { StyleSheet, Text, type TextProps } from "react-native";

type LabelProps = TextProps & {
  children: React.ReactNode;
};

export function Label({ children, style, ...rest }: LabelProps) {
  return (
    <Text style={[styles.label, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
});
