import PersonalizeIcon from "@/assets/icons/PersonalizeIcon";
import { Theme } from "@/assets/theme/theme";
import { faker } from "@faker-js/faker/.";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const theme = useTheme();
  const colorScheme = useColorScheme() || "light"; // Default to 'light' if undefined
  const styles = getStyles(colorScheme);
  const fakeAvatar = faker.image.avatar();

  return (
    <SafeAreaView>
      <View style={{ marginTop: 20, padding: 8 }}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Theme.schemes.dark.surfaceContainer,
            height: 88,
            borderRadius: 44,
            padding: 16,
            gap: 16,
          }}
        >
          {/* <Image
                        source={{ uri: fakeAvatar }}
                        style={styles.avatar}
                        resizeMode="contain"
                    /> */}
          <PersonalizeIcon />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              display: "flex",
              gap: 4,
            }}
          >
            <Text style={{ fontFamily: "Outfit", fontSize: 20 }}>
              Devis Jonas
            </Text>
            <Text
              style={{
                fontFamily: "Outfit",
                fontSize: 16,
                color: theme.colors.outline,
              }}
            >
              Online
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

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
      width: 56,
      height: 56,
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
