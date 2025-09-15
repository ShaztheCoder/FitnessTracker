import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export function QuickActions() {
  const actions = [
    {
      title: 'Start Workout',
      icon: 'play-circle' as const,
      color: 'bg-success-500',
      onPress: () => router.push('/(tabs)/workouts' as any), // Navigate to workouts tab
    },
    {
      title: 'Log Food',
      icon: 'restaurant' as const,
      color: 'bg-warning-500',
      onPress: () => router.push('/(tabs)/nutrition' as any),
    },
    {
      title: 'Add Weight',
      icon: 'scale' as const,
      color: 'bg-primary-500',
      onPress: () => router.push('/(tabs)/progress' as any),
    },
    {
      title: 'Take Photo',
      icon: 'camera' as const,
      color: 'bg-accent-500',
      onPress: () => router.push('/(tabs)/progress' as any),
    },
  ];

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-dark-900 mb-3">
        Quick Actions
      </Text>
      <View className="flex-row flex-wrap justify-between">
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={action.onPress}
            className={`${action.color} rounded-xl p-4 items-center justify-center shadow-brutal-sm`}
            style={{ width: '48%', marginBottom: 12 }}
          >
            <Ionicons name={action.icon} size={32} color="white" />
            <Text className="text-white font-semibold mt-2 text-center">
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}