import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Image, ScrollView, StyleSheet, useColorScheme, View } from 'react-native'
import { Badge, Chip, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { faker } from "@faker-js/faker";
import { Theme } from '@/assets/theme/theme'
import NotificationIcon from '@/components/NotificationIcon'
import CustomIconButton from '@/components/IconButton'
import MenuIcon from '@/components/MenuIcon';
import TextField from '@/components/TextField';
import ChatList from '@/components/ChatList';



export default function Page() {
  const { user } = useUser()
  const theme = useTheme()
  const fakeEmail = faker.internet.email();
  const fakeAvatar = faker.image.avatar();

  const colorScheme = useColorScheme() || "light"; // Default to 'light' if undefined

  const styles = getStyles(colorScheme);

  return (
    <SafeAreaView style={{
      backgroundColor: theme.colors.background,
      flex: 1
    }}>


      <View style={{ padding: 8 }}>




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
          // error={!!errors.password} // Display error if present
          // helperText={errors.password}
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
        <ScrollView style={{ flex: 1, backgroundColor: "red" }}>
          <ChatList />

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