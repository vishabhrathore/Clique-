import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { FlatList, Image, ScrollView, StyleSheet, useColorScheme, View } from 'react-native'
import { Badge, Chip, List, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { faker } from "@faker-js/faker";
import { Theme } from '@/assets/theme/theme'
import NotificationIcon from '@/components/NotificationIcon'
import CustomIconButton from '@/components/IconButton'
import MenuIcon from '@/components/MenuIcon';
import TextField from '@/components/TextField';
import { formatTimestamp } from '@/lib/logics';
import ChatItem from '@/components/ChatItem';
import { useState } from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';
import MistParticlesAnimation from '@/components/Mist';
import { NavIcons } from '@/constants';



export default function Page() {
  const { user } = useUser()
  const theme = useTheme()
  const fakeEmail = faker.internet.email();
  const fakeAvatar = faker.image.avatar();

  const DATA: {
    id: number;
    name: string;
    avatar: string;
    lastMessage: { text: string; timestamp: string; isRead: boolean };
    unreadCount: number;
  }[] =
    [
      {
        "id": 1,
        "name": "Alice Smith Alice Smith Alice Smith Alice Smith Alice Smith",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Are we still on for lunch tomorrow?",
          "timestamp": "2024-10-19T11:30:00Z",
          "isRead": true
        },
        "unreadCount": 56
      },
      {
        "id": 2,
        "name": "Bob Johnson",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Don't forget to send me those files!",
          "timestamp": "2024-10-21T10:15:00Z",
          "isRead": false
        },
        "unreadCount": 3
      },
      {
        "id": 3,
        "name": "Work Group",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Meeting rescheduled to 3 PM",
          "timestamp": "2024-10-21T09:45:00Z",
          "isRead": true
        },
        "unreadCount": 0
      },
      {
        "id": 4,
        "name": "Mom",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Call me when you get a chance, sweetie!",
          "timestamp": "2024-10-20T22:00:00Z",
          "isRead": true
        },
        "unreadCount": 0
      },
      {
        "id": 5,
        "name": "John Doe",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Hey, check out this funny meme!",
          "timestamp": "2024-10-20T20:30:00Z",
          "isRead": false
        },
        "unreadCount": 1
      },
      {
        "id": 7,
        "name": "Emma Watson",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Did you see the latest movie?",
          "timestamp": "2024-10-21T14:22:00Z",
          "isRead": false
        },
        "unreadCount": 2
      },
      {
        "id": 8,
        "name": "David Chen",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Thanks for the birthday wishes!",
          "timestamp": "2024-10-21T13:05:00Z",
          "isRead": true
        },
        "unreadCount": 0
      },
      {
        "id": 9,
        "name": "Sarah Johnson",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Can you send me the project report?",
          "timestamp": "2024-10-21T11:47:00Z",
          "isRead": false
        },
        "unreadCount": 1
      },
      {
        "id": 10,
        "name": "Family Group",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Who's bringing dessert to the reunion?",
          "timestamp": "2024-10-21T10:30:00Z",
          "isRead": true
        },
        "unreadCount": 0
      },
      {
        "id": 11,
        "name": "Alex Thompson",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "I'm running late for our meeting, sorry!",
          "timestamp": "2024-10-21T09:15:00Z",
          "isRead": true
        },
        "unreadCount": 0
      },
      {
        "id": 12,
        "name": "Fitness Buddies",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Who's up for a run this evening?",
          "timestamp": "2024-10-21T08:50:00Z",
          "isRead": false
        },
        "unreadCount": 5
      },
      {
        "id": 13,
        "name": "Maria Garcia",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Check out this new recipe I found!",
          "timestamp": "2024-10-20T22:30:00Z",
          "isRead": true
        },
        "unreadCount": 0
      },
      {
        "id": 14,
        "name": "Tech Support",
        "avatar": faker.image.avatar(),
        "lastMessage": {
          "text": "Your ticket has been resolved. Please confirm.",
          "timestamp": "2024-10-20T20:15:00Z",
          "isRead": false
        },
        "unreadCount": 1
      }
    ]

  const [data, setdata] = useState(DATA)
  const colorScheme = useColorScheme() || "light"; // Default to 'light' if undefined

  const styles = getStyles(colorScheme);

  return (
    <SafeAreaView style={{
      backgroundColor: theme.colors.background,
      flex: 1
    }}>


      <View style={{ padding: 12, }}>
        <View style={styles.nav}>
          <Image
            source={{ uri: fakeAvatar }}
            style={styles.avatar}
            resizeMode="contain"
          />
          <Text style={{ fontFamily: "Outfit", fontSize: 18 }} > 12 Messages</Text>

          <View style={styles.icon_group}>
            <CustomIconButton >

              <NotificationIcon />
            </CustomIconButton>
            <CustomIconButton >
              <MenuIcon />
            </CustomIconButton>
          </View>


        </View>
        <View style={{ paddingVertical: 12 }}>
          <TextField
            label="Search"
            placeholder="Search conversation and files"
            value={""}
            onChangeText={(text) => console.log(text)}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Chip onPress={() => console.log('Pressed')}>All</Chip>
            <Chip style={styles.unselectFIlter} onPress={() => console.log('Pressed')}>Unread</Chip>
            <Chip style={styles.unselectFIlter} onPress={() => console.log('Pressed')}>Pinned</Chip>
            <Chip style={styles.unselectFIlter} onPress={() => console.log('Pressed')}>Favourites</Chip>
            <Chip style={styles.unselectFIlter} onPress={() => console.log('Pressed')}>Groups</Chip>
          </View>
        </ScrollView>








        {/* <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>

      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut> */}
      </View>



      <View style={{ backgroundColor: "transparent", flex: 1, }}>
        <ScrollView>

          <Animated.FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()} // Convert id to string
            renderItem={({ item }) => (
              <ChatItem item={item} onDelete={() => { }} />
            )}
            scrollEnabled={false}
            itemLayoutAnimation={LinearTransition}
          />
        </ScrollView>

      </View>
      {/* <MistParticlesAnimation /> */}
    </SafeAreaView>

  )
}



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
  });