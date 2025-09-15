import React from 'react';
import { View, Text } from 'react-native';
export function FoodLog() {
  const recentFoods = [
    { name: 'Greek Yogurt', calories: 120, time: '8:30 AM', meal: 'breakfast' },
    { name: 'Banana', calories: 95, time: '10:15 AM', meal: 'snack' },
    { name: 'Chicken Salad', calories: 380, time: '12:45 PM', meal: 'lunch' },
    { name: 'Almonds', calories: 85, time: '3:20 PM', meal: 'snack' },
  ];

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-dark-900">Food Log</Text>
        <TouchableOpacity className="bg-success-500 px-3 py-1 rounded-lg">
          <Text className="text-white font-semibold text-sm">Add Food</Text>
        </TouchableOpacity>
      </View>
      
      <View className="bg-white rounded-xl shadow-brutal">
        {recentFoods.map((food, index) => (
          <View key={index} className={`p-4 ${index < recentFoods.length - 1 ? 'border-b border-dark-200' : ''}`}>
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="font-semibold text-dark-900">{food.name}</Text>
                <View className="flex-row items-center mt-1">
                  <View className={`w-2 h-2 rounded-full mr-2 ${
                    food.meal === 'breakfast' ? 'bg-warning-500' :
                    food.meal === 'lunch' ? 'bg-success-500' :
                    food.meal === 'dinner' ? 'bg-primary-500' : 'bg-accent-500'
                  }`} />
                  <Text className="text-dark-500 text-sm capitalize">{food.meal} • {food.time}</Text>
                </View>
              </View>
              <Text className="text-primary-600 font-semibold">{food.calories} kcal</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}