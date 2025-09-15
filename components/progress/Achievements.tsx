import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export function Achievements() {
  const achievements = [
    {
      title: 'First Workout',
      description: 'Completed your first workout',
      icon: 'trophy',
      color: 'bg-warning-500',
      achieved: true,
    },
    {
      title: 'Week Warrior',
      description: 'Completed 7 days in a row',
      icon: 'flame',
      color: 'bg-danger-500',
      achieved: true,
    },
    {
      title: 'Weight Goal',
      description: 'Lost 5kg from starting weight',
      icon: 'trending-down',
      color: 'bg-success-500',
      achieved: false,
    },
    {
      title: 'Consistency King',
      description: 'Completed 30 workouts',
      icon: 'medal',
      color: 'bg-primary-500',
      achieved: false,
    },
  ];

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-dark-900 mb-3">Achievements</Text>
      
      <View className="grid grid-cols-2 gap-3">
        {achievements.map((achievement, index) => (
          <View 
            key={index} 
            className={`bg-white rounded-xl p-4 shadow-brutal ${
              !achievement.achieved ? 'opacity-50' : ''
            }`}
          >
            <View className={`${achievement.color} w-12 h-12 rounded-full items-center justify-center mb-3`}>
              <Ionicons 
                name={achievement.icon as any} 
                size={24} 
                color="white" 
              />
            </View>
            <Text className="font-semibold text-dark-900 mb-1">{achievement.title}</Text>
            <Text className="text-dark-600 text-sm">{achievement.description}</Text>
            
            {achievement.achieved && (
              <View className="flex-row items-center mt-2">
                <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
                <Text className="text-success-600 text-xs ml-1">Achieved</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}