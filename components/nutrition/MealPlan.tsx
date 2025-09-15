import React from 'react';
import { View, Text } from 'react-native';
export function MealPlan() {
  const meals = [
    {
      name: 'Breakfast',
      icon: 'sunny-outline',
      items: ['Oatmeal with berries', 'Greek yogurt'],
      calories: 350,
    },
    {
      name: 'Lunch',
      icon: 'partly-sunny-outline',
      items: ['Grilled chicken salad', 'Quinoa'],
      calories: 450,
    },
    {
      name: 'Dinner',
      icon: 'moon-outline',
      items: ['Salmon with vegetables', 'Brown rice'],
      calories: 520,
    },
    {
      name: 'Snacks',
      icon: 'cafe-outline',
      items: ['Apple', 'Almonds'],
      calories: 180,
    },
  ];

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-dark-900 mb-3">Today's Meal Plan</Text>
      <View className="bg-white rounded-xl shadow-brutal">
        {meals.map((meal, index) => (
          <View key={index} className={`p-4 ${index < meals.length - 1 ? 'border-b border-dark-200' : ''}`}>
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <Ionicons name={meal.icon as any} size={20} color="#64748b" />
                <Text className="font-semibold text-dark-900 ml-2">{meal.name}</Text>
              </View>
              <Text className="text-primary-600 font-semibold">{meal.calories} kcal</Text>
            </View>
            <Text className="text-dark-600 text-sm">{meal.items.join(', ')}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}