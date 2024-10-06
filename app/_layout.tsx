import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";

//2. Import Router Theme
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import merge from "deepmerge";

import { Theme } from "@/assets/theme/theme";

const customDarkTheme = { ...MD3DarkTheme, colors: Theme.schemes.dark };
const customLightTheme = { ...MD3LightTheme, colors: Theme.schemes.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  console.log("color scheme", colorScheme);

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    Outfit300: require("../assets/fonts/Outfit-Thin.ttf"),
    Outfit500: require("../assets/fonts/Outfit-SemiBold.ttf"),
    Outfit600: require("../assets/fonts/Outfit-Bold.ttf"),
    Outfit700: require("../assets/fonts/Outfit-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" />

          <Stack.Screen name="+not-found"
          />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
