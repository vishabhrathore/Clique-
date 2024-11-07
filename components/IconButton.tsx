import { Theme } from "@/assets/theme/theme";
import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  GestureResponderEvent,
  ViewStyle,
  useColorScheme,
} from "react-native";

interface CustomIconButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  children?: ReactNode;
  style?: ViewStyle; // Optional style prop for custom button styling
  showBadge?: boolean; // Optional prop to control badge visibility
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  onPress,
  children,
  style,
  showBadge = true,
}) => {
  const colorScheme = useColorScheme() || "light"; // Default to 'light' if undefined
  const styles = getStyles(colorScheme);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.iconButton, style]}>
      <View style={styles.icon}>
        {children}
        {showBadge && <View style={styles.badge} />}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    iconButton: {
      padding: 10,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
      elevation: 3, // Shadow for Android
      shadowColor: "#000", // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      height: 44,
      width: 44,
    },
    icon: {
      height: 44,
      width: 44,
      backgroundColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5",
      display: "flex",
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
      position: "relative", // Ensure the badge can be positioned relative to the icon
    },
    badge: {
      position: "absolute", // Absolute positioning to place it on top-right
      top: 0,
      right: 0,
      height: 10, // Badge size
      width: 10,
      borderRadius: 5, // Make it circular
      backgroundColor: "#ca0000", // Red color for the badge
    },
  });

export default CustomIconButton;
