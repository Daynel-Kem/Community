import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={handleLogout}
            style={{ marginRight: 16, paddingHorizontal: 8 }}>
            <Text style={{ color: '#007AFF', fontSize: 16 }} onPress={handleLogout}>
              Logout
            </Text>
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Welcome',
        }}
      />
    </Tabs>
  );
}

import { Text } from 'react-native';
