import { View, StyleSheet, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import { MD3Theme, useTheme } from "react-native-paper";
import { Theme } from "@/assets/theme/theme";
import { NavIconRouteMap } from "@/constants";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { observer } from "mobx-react-lite";
import { useTabUIStore } from "@/Store/TabUiStore.";
import { reaction } from "mobx";

interface TabBarProps extends BottomTabBarProps {}

const TabBar: React.FC<TabBarProps> = observer(
  ({ state, descriptors, navigation }) => {
    const tabUIStore = useTabUIStore(); // Access the store
    const theme = useTheme();
    const colorScheme = useColorScheme() || "light";
    const translateY = useSharedValue(0);
    const styles = getStyles(colorScheme, theme);

    // Initial state for tab bar
    useEffect(() => {
      // Reaction to tabUIStore's lastScrollDirection changes
      const disposeReaction = reaction(
        () => tabUIStore.lastScrollDirection, // Observing lastScrollDirection
        (newDirection) => {
          if (newDirection === "down") {
            translateY.value = withTiming(100, {
              // Hide tab bar
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          } else if (newDirection === "up") {
            translateY.value = withTiming(0, {
              // Show tab bar
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          }
        },
      );

      // Cleanup reaction on unmount
      return () => {
        disposeReaction();
      };
    }, [tabUIStore]);

    // Animated style for the tab bar
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <Animated.View style={[styles.tabbarContainer, animatedStyle]}>
        <View style={styles.frostedBackground}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;

            if (["_sitemap", "+not-found"].includes(route.name)) return null;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TabBarButton
                key={route.name}
                style={styles.tabbarItem}
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName={route.name}
                color={
                  isFocused ? Theme.coreColors.primary : theme.colors.outline
                }
                label={label as string}
                Icon={
                  isFocused
                    ? NavIconRouteMap[route.name].activeIcon
                    : NavIconRouteMap[route.name].inactiveIcon
                }
              />
            );
          })}
        </View>
      </Animated.View>
    );
  },
);

const getStyles = (colorScheme: "light" | "dark", theme: MD3Theme) =>
  StyleSheet.create({
    tabbarContainer: {
      position: "absolute",
      bottom: 25,
      left: 20,
      right: 20,
      zIndex: 1000,
      opacity: 0.95,
    },
    frostedBackground: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 30,
      overflow: "hidden",
      backgroundColor: theme.colors.surface,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: -4 },
      shadowRadius: 30,
      shadowOpacity: 0.2,
      elevation: 10, // For Android
    },
    tabbarItem: {
      flex: 1,
      alignItems: "center",
    },
  });

export default TabBar;
