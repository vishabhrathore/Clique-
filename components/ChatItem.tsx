import { Theme } from '@/assets/theme/theme';
import { formatTimestamp } from '@/lib/logics';
import { ChatItemProps } from '@/types/type';
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, useColorScheme, Dimensions, Pressable, Vibration } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Badge, Icon, IconButton, useTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS, withTiming } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

const ChatItem: React.FC<ChatItemProps> = ({ item, onDelete }) => {
    const colorScheme = useColorScheme() || 'light';
    const [textWidth, setTextWidth] = useState(0);
    const theme = useTheme();
    const styles = getStyles(colorScheme, theme);


    // Shared values for animation
    const scale = useSharedValue(1);
    // const translateY = useSharedValue(0);
    const paddingHorizontal = useSharedValue(12);
    const translateX = useSharedValue(0); // Horizontal movement for sliding
    const isDeleted = useSharedValue(false); // Flag to mark the deletion state
    const TRANSLATE_X_THRESHLOD = - screenWidth * 0.3

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            // { translateY: translateY.value },
            { translateX: translateX.value },
        ],
        paddingHorizontal: paddingHorizontal.value,
        opacity: 1, // Fade out when deleted
    }));

    const handleLongPressIn = () => {
        scale.value = withSpring(1.03); // Scale up on long press
        // translateY.value = withSpring(-10); // Float upwards slightly
        paddingHorizontal.value = withSpring(10);
    };

    const handleLongPressOut = () => {
        scale.value = withSpring(1); // Return to original scale
        // translateY.value = withSpring(0); // Reset position
        paddingHorizontal.value = withSpring(12);
    };

    const handleTextLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setTextWidth(width);
    };

    const deleteItem = () => {
        if (onDelete) {
            console.log(item.id)
            onDelete(); // Call the delete function passed via props
        }
    };

    // Gesture for sliding
    const panGesture = Gesture.Pan()
        // .activateAfterLongPress(1)
        .onUpdate((event) => {
            translateX.value = event.translationX;

            // If user slides beyond -150 px, mark for deletion
            // if (translateX.value < -150) {
            //     runOnJS(deleteItem)(); // Trigger deletion via JS
            // }
        })
        .onEnd(() => {
            // Reset position if not deleted
            console.log(translateX.value)
            const shouldDismissed = translateX.value < TRANSLATE_X_THRESHLOD
            console.log(shouldDismissed)
            if (shouldDismissed) {
                translateX.value = withTiming(-screenWidth)
                runOnJS(deleteItem)()
            } else {
                translateX.value = withSpring(0)
            }
        });

    return (
        <GestureHandlerRootView style={styles.main}>
            <View style={styles.iconContainer}>
                <IconButton
                    icon="trash-can" // You can use 'delete' if 'trash-can' is not available
                    iconColor={theme.colors.errorContainer}
                    size={24} // Set the size of the icon
                />
            </View>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.container, animatedStyle]}>
                    {/* <Pressable onLongPress={handleLongPressIn}
                    //  onPressOut={handleLongPressOut} */}
                    {/* > */}
                    <View style={{ marginVertical: 12, display: 'flex', flexDirection: 'row', gap: 12 }}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} resizeMode="contain" />
                        <View style={{ flex: 1 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text
                                    style={{
                                        fontFamily: 'Outfit',
                                        fontSize: 18,
                                        overflow: 'hidden',
                                        color: theme.colors.onSurface,
                                        flexBasis: screenWidth - textWidth - 90,
                                    }}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.name}
                                </Text>

                                <Text
                                    style={{
                                        fontFamily: 'Outfit',
                                        fontSize: 12,
                                        color: theme.colors.outline,
                                        marginLeft: 'auto',
                                    }}
                                    onLayout={handleTextLayout}
                                >
                                    {formatTimestamp(item.lastMessage.timestamp)}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text
                                    style={{
                                        fontFamily: 'Outfit',
                                        fontSize: 16,
                                        color: theme.colors.outline,
                                        overflow: 'hidden',
                                        flexBasis: screenWidth - String(item.unreadCount).length - 106,
                                    }}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.lastMessage.text}
                                </Text>
                                <Badge
                                    style={{
                                        backgroundColor: theme.colors.secondaryContainer,
                                        color: theme.colors.primary,
                                        fontSize: 12,
                                    }}
                                >
                                    {item.unreadCount}
                                </Badge>
                            </View>
                        </View>
                    </View>
                    {/* </Pressable> */}
                </Animated.View>
            </GestureDetector>

        </GestureHandlerRootView>

    );
};

export default ChatItem;

// Add your dynamic styles here as in the original code
const getStyles = (colorScheme: "light" | "dark", theme: ThemeProp) =>
    StyleSheet.create({
        iconContainer: {
            position: "absolute",
            right: "5%",

        },
        main: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            height: 44,
            width: 44,
            backgroundColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5",
            display: "flex",
            borderRadius: 22,
            justifyContent: "center",
            alignItems: "center"

        },
        nav: {
            paddingVertical: 4,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            gap: 8
        },
        icon_group: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginLeft: "auto"
        },
        avatar: {
            width: 48,
            height: 48,
            borderRadius: 26,
        },
        avatarChat: {
            width: 40,
            height: 40,
            borderRadius: 21,
        },
        container: {
            width: "100%",
            paddingHorizontal: 12,
            backgroundColor: theme.colors?.background

        },
        unselectFIlter: {
            backgroundColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5", // Dynamic background
            borderRadius: 8


        },
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5", // Dynamic background
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5", // Dynamic border
            paddingHorizontal: 16,
        },

        input: {
            flex: 1,
            borderRadius: 12,
            paddingVertical: 12,
            fontFamily: "Outfit",
            fontSize: 16,
            textAlign: "left",
            color: colorScheme === "dark" ? Theme.schemes.dark.secondary : Theme.schemes.light.primaryContainer, // Dynamic text color
        },
        chip: {
            padding: 0,
            width: "auto"
        }
    });