import React from 'react';
import { router, Tabs, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue, withSpring } from 'react-native-reanimated';
import { NavIcons } from '@/constants';
import { useTheme, Text } from 'react-native-paper'; // Importing theme and Text component
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'; // Import the type

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const translateX = useSharedValue(0);
  const theme = useTheme(); // Accessing theme

  // Gesture for swiping between tabs
  const handleRouteChange = (route: any) => {
    router.push(route);
  };

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < -50) {
        // Swipe left to go to the next tab
        runOnJS(handleRouteChange)("/update");
      } else if (event.translationX > 50) {
        // Swipe right to go to the previous tab
        runOnJS(handleRouteChange)("/chat");
      }
      translateX.value = withSpring(0); // Reset after swipe
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <Animated.View style={{ flex: 1 }}>
          <Tabs
            screenOptions={({ route }): BottomTabNavigationOptions => ({
              tabBarActiveTintColor: colorScheme === 'dark' ? "#1D1A21" : "#f5f5f5",
              headerShown: false,
              tabBarStyle: {
                backgroundColor: theme.colors.background, // Setting tab bar background color
                paddingVertical: 16, // Adjust the vertical padding for height
                paddingHorizontal: 8, // Optional: Adjust horizontal padding
                borderTopWidth: 0, // Removing border
                height: 80, // Set the desired height of the tab bar
              },
            })}
          >
            <Tabs.Screen
              name="chat"
              options={{
                title: 'Chat',
                tabBarIcon: ({ color, focused }) => (
                  focused ? <NavIcons.chatFilled /> : <NavIcons.chatOutline />
                ),
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={{
                      fontFamily: focused ? 'Outfit500' : 'Outfit',
                      fontSize: 14, // Adjust size if necessary
                      marginVertical: 8, // Spacing between icon and text
                    }}
                  >
                    Chat
                  </Text>
                ),
              }}
            />
            <Tabs.Screen
              name="update"
              options={{
                title: 'Update',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
                ),
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={{
                      fontFamily: focused ? 'Outfit500' : 'Outfit',
                      fontSize: 14,
                      marginVertical: 8,
                    }}
                  >
                    Update
                  </Text>
                ),
              }}
            />
            <Tabs.Screen
              name="call"
              options={{
                title: 'Call',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'call' : 'call-outline'} color={color} />
                ),
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={{
                      fontFamily: focused ? 'Outfit500' : 'Outfit',
                      fontSize: 14,
                      marginVertical: 8,
                    }}
                  >
                    Call
                  </Text>
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Profile',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                ),
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={{
                      fontFamily: focused ? 'Outfit500' : 'Outfit',
                      fontSize: 14,
                      marginVertical: 8,
                    }}
                  >
                    Profile
                  </Text>
                ),
              }}
            />
          </Tabs>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
