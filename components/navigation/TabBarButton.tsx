import { View, Pressable, StyleSheet, TextStyle } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { NavIcons } from '@/constants';
import { SvgProps } from 'react-native-svg';


interface CustomIconProps {
    width?: number;
    height?: number;
    color?: string;
}
interface TabBarButtonProps {
    isFocused: boolean;
    label: string;
    routeName: string;
    color: string;
    onPress: () => void;
    onLongPress: () => void;
    style: object,
    Icon: React.FC<CustomIconProps & SvgProps>;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({ isFocused, label, routeName, color, Icon, ...props }) => {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
        const top = interpolate(scale.value, [0, 1], [0, 8]);

        return {
            transform: [{ scale: scaleValue }],
            top,
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0]);

        return {
            opacity,
        };
    });

    return (
        <Pressable {...props} style={styles.container}>
            <Animated.View style={animatedIconStyle}>
                <Icon color={color} />
            </Animated.View>

            <Animated.Text style={[{ color, fontSize: 14, fontFamily: "Outfit500" } as TextStyle, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
});

export default TabBarButton;
