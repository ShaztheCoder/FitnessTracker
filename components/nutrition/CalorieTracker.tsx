import React from 'react';
import { View, Text } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

interface CalorieTrackerProps {
  goal: number;
  current: number;
}

export function CalorieTracker({ goal, current }: CalorieTrackerProps) {
  const percentage = (current / goal) * 100;
  const remaining = Math.max(0, goal - current);

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-dark-900 mb-3">Daily Calories</Text>
      <View className="bg-white rounded-xl p-6 shadow-brutal items-center">
        <View className="relative items-center justify-center mb-4">
          <View className="w-32 h-32 rounded-full bg-primary-100 items-center justify-center">
            <Text className="text-2xl font-bold text-primary-600">{current}</Text>
            <Text className="text-primary-500 text-sm">/ {goal} kcal</Text>
          </View>
          <View className="absolute inset-0 rounded-full border-4 border-primary-200" style={{
            borderLeftColor: percentage >= 25 ? '#3b82f6' : '#bfdbfe',
            borderTopColor: percentage >= 50 ? '#3b82f6' : '#bfdbfe',
            borderRightColor: percentage >= 75 ? '#3b82f6' : '#bfdbfe',
            borderBottomColor: percentage >= 100 ? '#3b82f6' : '#bfdbfe',
          }} />
        </View>
        
        <View className="flex-row justify-between w-full">
          <View className="items-center">
            <Text className="text-lg font-bold text-success-600">{remaining}</Text>
            <Text className="text-dark-500 text-sm">Remaining</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-primary-600">{Math.round(percentage)}%</Text>
            <Text className="text-dark-500 text-sm">Progress</Text>
          </View>
        </View>
      </View>
    </View>
  );
}