import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useWorkouts } from '@/hooks/useWorkouts';

export function RecentWorkouts() {
  const { workouts, loading } = useWorkouts();
  const recentWorkouts = workouts.slice(0, 3);

  const renderWorkout = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(tabs)/workouts`)}
      className="bg-white rounded-lg p-3 mb-2 shadow-brutal-sm border-2 border-dark-200"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="bg-primary-100 p-2 rounded-lg mr-3">
            <Ionicons name="fitness" size={20} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text className="font-semibold text-dark-900">{item.name}</Text>
            <Text className="text-dark-600 text-sm capitalize">{item.type}</Text>
          </View>
        </View>
        <Text className="text-dark-500 text-sm">{item.duration}min</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-dark-900">Recent Workouts</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/workouts')}>
          <Text className="text-primary-600 font-semibold">View All</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View className="bg-white rounded-lg p-6 shadow-brutal">
          <Text className="text-dark-500 text-center">Loading workouts...</Text>
        </View>
      ) : recentWorkouts.length > 0 ? (
        <FlatList
          data={recentWorkouts}
          renderItem={renderWorkout}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      ) : (
        <View className="bg-white rounded-lg p-6 shadow-brutal items-center">
          <Ionicons name="fitness-outline" size={48} color="#94a3b8" />
          <Text className="text-dark-500 mt-2">No recent workouts</Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/workouts')}
            className="bg-primary-500 px-4 py-2 rounded-lg mt-3 shadow-brutal-sm"
          >
            <Text className="text-white font-semibold">Start Workout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}