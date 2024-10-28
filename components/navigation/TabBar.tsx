import { View, StyleSheet, useColorScheme } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from './TabBarButton';
import { MD3Theme, useTheme } from 'react-native-paper';
import { Theme } from '@/assets/theme/theme';
import { NavIconRouteMap } from '@/constants';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface TabBarProps extends BottomTabBarProps { }

const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
    const theme = useTheme();
    const colorScheme = useColorScheme() || "light";

    // Shared value for tab bar's position
    const translateY = useSharedValue(0);

    const styles = getStyles(colorScheme, theme);

    // Auto-hide tab bar after 5 seconds
    useEffect(() => {
        // Show the tab bar initially
        translateY.value = withTiming(-25, {
            duration: 500,
            easing: Easing.out(Easing.exp),
        });

        const timer = setTimeout(() => {
            // Hide the tab bar
            translateY.value = withTiming(100, { // Adjust this value as needed
                duration: 500,
                easing: Easing.out(Easing.exp),
            });
        }, 5000); // 5000 ms = 5 seconds

        return () => clearTimeout(timer);
    }, []);

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

                    if (['_sitemap', '+not-found'].includes(route.name)) return null;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
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
                            color={isFocused ? Theme.coreColors.primary : theme.colors.outline}
                            label={label as string}
                            Icon={isFocused ? NavIconRouteMap[route.name].activeIcon : NavIconRouteMap[route.name].inactiveIcon}
                        />
                    );
                })}
            </View>
        </Animated.View>
    );
};

const getStyles = (colorScheme: "light" | "dark", theme: MD3Theme) =>
    StyleSheet.create({
        tabbarContainer: {
            position: 'absolute',
            bottom: 0,
            left: 20,
            right: 20,
            zIndex: 1000,
            opacity: 0.95,
        },
        frostedBackground: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 30,
            overflow: 'hidden',
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: -4 },
            shadowRadius: 30,
            shadowOpacity: 0.2,
            elevation: 10, // For Android
        },
        tabbarItem: {
            flex: 1,
            alignItems: 'center',
        },
    });

export default TabBar;
