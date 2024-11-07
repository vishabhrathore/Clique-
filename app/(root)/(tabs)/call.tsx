import { Theme } from "@/assets/theme/theme";
import CallItem from "@/components/navigation/CallItem";
import { useTabUIStore } from "@/Store/TabUiStore.";
import { CallData } from "@/types/type";
import { faker } from "@faker-js/faker/.";
import { useRef, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import Animated, { LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
const fakeAvatar = faker.image.avatar();
const callData: CallData[] = [
  {
    id: 1,
    name: "John Doe",
    phoneNumber: "+1 (555) 1234",
    duration: 120,
    time: "2023-10-29T14:30:00Z",
    type: "Incoming",
    callType: "Voice",
    isGroup: false,
    avatar: faker.image.avatar(),
  },
  {
    id: 2,
    name: "Jane Smith",
    phoneNumber: "+1 (555) 5678",
    duration: 90,
    time: "2023-10-29T15:00:00Z",
    type: "Outgoing",
    callType: "Video",
    isGroup: false,
    avatar: faker.image.avatar(),
  },
  {
    id: 3,
    name: "Group Call",
    phoneNumber: "Group",
    duration: 45,
    time: "2023-10-29T15:45:00Z",
    type: "Missed",
    callType: "Voice",
    isGroup: true,
    participants: [
      { name: "Bob Johnson", avatar: faker.image.avatar() },
      { name: "Alice Williams", avatar: faker.image.avatar() },
      { name: "Tom Davis", avatar: faker.image.avatar() },
    ],
    avatar: faker.image.avatar(),
  },
  {
    id: 4,
    name: "Alice Williams",
    phoneNumber: "+1 (555) 3456",
    duration: 180,
    time: "2023-10-29T16:15:00Z",
    type: "Incoming",
    callType: "Video",
    isGroup: false,
    avatar: faker.image.avatar(),
  },
  {
    id: 5,
    name: "Tom Davis",
    phoneNumber: "+1 (555) 7890",
    duration: 60,
    time: "2023-10-29T16:45:00Z",
    type: "Outgoing",
    callType: "Voice",
    isGroup: false,
    avatar: faker.image.avatar(),
  },
  {
    id: 6,
    name: "Group Call",
    phoneNumber: "Group",
    duration: 150,
    time: "2023-10-30T10:00:00Z",
    type: "Incoming",
    callType: "Video",
    isGroup: true,
    participants: [
      { name: "Sarah Lee", avatar: faker.image.avatar() },
      { name: "Michael Chen", avatar: faker.image.avatar() },
      { name: "Emily Wilson", avatar: faker.image.avatar() },
      { name: "David Kim", avatar: faker.image.avatar() },
    ],
    avatar: faker.image.avatar(),
  },
  {
    id: 7,
    name: "Michael Chen",
    phoneNumber: "+1 (555) 1357",
    duration: 30,
    time: "2023-10-30T11:30:00Z",
    type: "Missed",
    callType: "Voice",
    isGroup: false,
    avatar: faker.image.avatar(),
  },
  {
    id: 8,
    name: "Emily Wilson",
    phoneNumber: "+1 (555) 8642",
    duration: 90,
    time: "2023-10-30T14:20:00Z",
    type: "Outgoing",
    callType: "Video",
    isGroup: false,
    avatar: faker.image.avatar(),
  },
  {
    id: 9,
    name: "David Kim",
    phoneNumber: "+1 (555) 3698",
    duration: 120,
    time: "2023-10-30T16:45:00Z",
    type: "Incoming",
    callType: "Voice",
    isGroup: false,
    avatar: faker.image.avatar(),
  },
  {
    id: 10,
    name: "Olivia Nguyen",
    phoneNumber: "+1 (555) 7531",
    duration: 75,
    time: "2023-10-31T09:15:00Z",
    type: "Outgoing",
    callType: "Video",
    isGroup: false,
    avatar: faker.image.avatar(),
  },
];

const Home = () => {
  const tabUIStore = useTabUIStore(); // Access the store

  const theme = useTheme();
  const sortedDataDescending = callData.sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });

  const colorScheme = useColorScheme() || "light"; // Default to 'light' if undefined

  const styles = getStyles(colorScheme);

  const scrollPositionY = useRef(0);
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: theme.colors.background,
          flex: 1,
        },
      ]}
    >
      <GestureHandlerRootView>
        <View style={{ backgroundColor: "transparent", flex: 1 }}>
          <Text> ugsdfuisg</Text>
          <ScrollView>
            <Animated.FlatList
              data={sortedDataDescending}
              keyExtractor={(item) => item.id.toString()} // Convert id to string
              renderItem={({ item }) => (
                <CallItem item={item} onDelete={() => {}} />
              )}
              scrollEnabled={false}
              itemLayoutAnimation={LinearTransition}
            />
          </ScrollView>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;

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
      alignItems: "center",
    },
    nav: {
      paddingVertical: 4,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      gap: 8,
    },
    icon_group: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginLeft: "auto",
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
      borderRadius: 8,
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
      color:
        colorScheme === "dark"
          ? Theme.schemes.dark.secondary
          : Theme.schemes.light.primaryContainer, // Dynamic text color
    },
  });
