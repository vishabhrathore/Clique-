import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="call" />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="profile" />
      <Stack.Screen name="update" />
    </Stack>
  );
};

export default Layout;
