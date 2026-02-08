import {
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

export function Textarea({ style, ...rest }: TextInputProps) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    minHeight: 100,
  },
});
