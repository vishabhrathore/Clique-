import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/components/navigation/TabBar';
import inject from "mobx-react"


const Layout: React.FC = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          title: 'Chat',
        }}
      />
      <Tabs.Screen
        name="update"
        options={{
          headerShown: false,
          title: 'Update',
        }}
      />
      <Tabs.Screen
        name="call"
        options={{
          headerShown: false,
          title: 'Call',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
        }}
      />
    </Tabs>
  );
};

export default Layout;
