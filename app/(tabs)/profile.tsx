import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { SettingsSection } from '@/components/profile/SettingsSection';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-dark-50">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header */}
        <Text className="text-2xl font-bold text-dark-900 mb-6">Profile</Text>

        {/* User Info */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-brutal">
          <View className="flex-row items-center">
            <Image
              source={{
                uri: user?.photoURL || 'https://via.placeholder.com/80x80',
              }}
              className="w-20 h-20 rounded-full"
            />
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-dark-900">
                {user?.displayName || 'User Name'}
              </Text>
              <Text className="text-dark-600 mt-1">{user?.email}</Text>
              <TouchableOpacity className="bg-primary-500 px-4 py-2 rounded-lg mt-3 self-start shadow-brutal-sm">
                <Text className="text-white font-semibold">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        <SettingsSection
          title="Health & Fitness"
          items={[
            { label: 'Goals & Targets', icon: 'triangle', action: () => {} },
            { label: 'Health Metrics', icon: 'heart', action: () => {} },
            { label: 'Workout Preferences', icon: 'fitness', action: () => {} },
          ]}
        />

        <SettingsSection
          title="App Settings"
          items={[
            { label: 'Notifications', icon: 'notifications', action: () => {} },
            { label: 'Privacy', icon: 'shield', action: () => {} },
            { label: 'Units & Measurements', icon: 'resize', action: () => {} },
          ]}
        />

        <SettingsSection
          title="Support"
          items={[
            { label: 'Help Center', icon: 'help-circle', action: () => {} },
            { label: 'Contact Us', icon: 'mail', action: () => {} },
            { label: 'Rate App', icon: 'star', action: () => {} },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}