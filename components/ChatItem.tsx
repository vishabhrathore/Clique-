import { Theme } from '@/assets/theme/theme';
import { formatTimestamp } from '@/lib/logics';
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import { Badge, Chip, useTheme } from 'react-native-paper';

interface LastMessage {
    text: string;
    timestamp: string;
    isRead: boolean;
}

interface Item {
    id: number;
    name: string;
    avatar: string;
    lastMessage: LastMessage;
    unreadCount: number;
}

interface ChatItemProps {
    item: Item;
}

const ChatItem: React.FC<ChatItemProps> = ({ item }) => {
    const colorScheme = useColorScheme() || "light"; // Default to 'light' if undefined
    const [textWidth, setTextWidth] = useState(0);

    const screenWidth = Dimensions.get('window').width;
    const styles = getStyles(colorScheme);
    const theme = useTheme();

    const handleTextLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setTextWidth(width);
    };
    console.log("render", item.id)


    return (
        <View style={{
            marginVertical: 12,
            display: "flex",
            flexDirection: "row",
            gap: 12,
        }}>
            <Image
                source={{ uri: item.avatar }}
                style={styles.avatar} // Ensure styles.avatar is defined
                resizeMode="contain"
            />
            <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Text
                        style={{
                            fontFamily: "Outfit",
                            fontSize: 18,
                            overflow: 'hidden', // Hide overflow text
                            color: theme.colors.onSurface,
                            flexBasis: screenWidth - textWidth - 90
                        }}
                        numberOfLines={1} // Truncate the name if it's too long
                        ellipsizeMode="tail"
                    >
                        {item.name}
                    </Text>

                    <Text
                        style={{
                            fontFamily: "Outfit",
                            fontSize: 12,
                            color: theme.colors.outline,
                            alignSelf: "center",
                            marginLeft: "auto"
                        }}
                        onLayout={handleTextLayout}

                    >
                        {formatTimestamp(item.lastMessage.timestamp)}
                    </Text>
                </View>

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>


                    <Text
                        style={{
                            fontFamily: "Outfit",
                            fontSize: 16,
                            color: theme.colors.outline,
                            overflow: 'hidden',
                            flexBasis: screenWidth - String(item.unreadCount).length - 106

                        }}
                        numberOfLines={1} // Truncate the last message if it's too long
                        ellipsizeMode="tail"

                    >
                        {item.lastMessage.text}

                    </Text>
                    <Badge
                        style={{ backgroundColor: theme.colors.secondaryContainer, color: theme.colors.primary, fontSize: 12 }}  // Change background color
                    >{item.unreadCount}</Badge>
                </View>
            </View>
        </View>
    );
};

export default ChatItem;

// Dynamically create styles based on color scheme
const getStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
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