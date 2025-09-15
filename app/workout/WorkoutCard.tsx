import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Workout } from '@/hooks/useWorkouts';

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getTypeIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
      strength: 'barbell-outline',
      cardio: 'heart-outline',
      yoga: 'leaf-outline',
      hiit: 'flash-outline',
      flexibility: 'body-outline',
    };
    return icons[type] || 'fitness-outline';
  };

  return (
    <TouchableOpacity
      onPress={() => {
        // Navigate to workouts tab instead since [id] route has type issues
        router.push('/(tabs)/workouts' as any);
      }}
      className="bg-white rounded-xl p-4 mb-3 shadow-brutal"
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="bg-primary-100 p-2 rounded-lg mr-3">
            <Ionicons
              name={getTypeIcon(workout.type)}
              size={24}
              color="#2563eb"
            />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-dark-900">
              {workout.name}
            </Text>
            <Text className="text-dark-600 capitalize">{workout.type}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-dark-500 text-sm">
            {formatDuration(workout.duration)}
          </Text>
          <Text className="text-dark-500 text-sm">
            {workout.exercises.length} exercises
          </Text>
        </View>
      </View>
      
      {workout.completedAt && (
        <View className="flex-row items-center">
          <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
          <Text className="text-success-600 text-sm ml-2">
            Completed {workout.completedAt.toLocaleDateString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}