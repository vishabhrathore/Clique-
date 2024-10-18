import React from 'react';
import { Text, StyleSheet, View, Animated } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface ChatItemProps {
    chatName: string;
    onArchive: () => void;
    onDelete: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chatName, onArchive, onDelete }) => {
    const renderLeftActions = (
        progress: any,
        dragX: any
    ) => {
        const trans = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0.8, 1], // Valid scale values
        });

        return (
            <Animated.View style={[styles.leftAction, { transform: [{ scale: trans }] }]}>
                <RectButton style={styles.actionButton} onPress={onArchive}>
                    <Text style={styles.actionText}>Archive</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (
        progress: any,
        dragX: any
    ) => {
        const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0.8, 1], // Valid scale values
        });

        return (
            <Animated.View style={[styles.rightAction, { transform: [{ scale: trans }] }]}>
                <RectButton style={styles.actionButton} onPress={onDelete}>
                    <Text style={styles.actionText}>Delete</Text>
                </RectButton>
            </Animated.View>
        );
    };

    return (
        <GestureHandlerRootView>
            <Swipeable
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
            >
                <View style={styles.chatItem}>
                    <Text>{chatName}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
};

const ChatList: React.FC = () => {
    const handleArchive = (chat: string) => {
        console.log(`${chat} archived`);
        // Add archive logic here
    };

    const handleDelete = (chat: string) => {
        console.log(`${chat} deleted`);
        // Add delete logic here
    };

    const chats = ['Chat 1', 'Chat 2', 'Chat 3'];

    return (
        <View>
            {chats.map((chat, index) => (
                <ChatItem
                    key={index}
                    chatName={chat}
                    onArchive={() => handleArchive(chat)}
                    onDelete={() => handleDelete(chat)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    chatItem: {
        padding: 20,
        backgroundColor: 'red',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    leftAction: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    },
    rightAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
    },
    actionButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ChatList;
