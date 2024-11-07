import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { ButtonProps } from "@/types/type";
import { Text, useTheme } from "react-native-paper";
import { Theme } from "@/assets/theme/theme";

const AuthButton = ({
  onPress,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  children,
  style,
  ...props
}: ButtonProps) => {
  const theme = useTheme();
  const colorScheme = useColorScheme() || "light";
  const styles = getStyles(colorScheme); // Pass the resolved color scheme

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      {...props}
    >
      {IconLeft && <IconLeft height={24} width={24} />}
      <View
        style={{
          height: "100%",
          width: 2,
          backgroundColor: theme.colors.outline,
          marginHorizontal: 12,
        }}
      />
      <Text style={styles.text}>{children}</Text>
      {IconRight && <IconRight height={24} width={24} />}
    </TouchableOpacity>
  );
};

export default AuthButton;

const getStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5", // Dynamic background
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    text: {
      color:
        colorScheme === "dark"
          ? Theme.schemes.dark.outline
          : Theme.schemes.light.outline, // Dynamic text color
      fontFamily: "Outfit500",
      fontSize: 18,
    },

    icon: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
  });
