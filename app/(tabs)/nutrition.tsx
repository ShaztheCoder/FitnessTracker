import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CalorieTracker } from '@/components/nutrition/CalorieTracker';
import { MacroBreakdown } from '@/components/nutrition/MacroBreakdown';
import { MealPlan } from '@/components/nutrition/MealPlan';
import { FoodLog } from '@/components/nutrition/FoodLog';

export default function NutritionScreen() {
  const [dailyGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 67,
  });

  const [currentIntake, setCurrentIntake] = useState({
    calories: 1235,
    protein: 89,
    carbs: 142,
    fat: 45,
  });

  return (
    <SafeAreaView className="flex-1 bg-dark-50">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-dark-900">Nutrition</Text>
          <TouchableOpacity className="bg-success-500 px-4 py-2 rounded-lg shadow-brutal-sm">
            <Text className="text-white font-semibold">Log Food</Text>
          </TouchableOpacity>
        </View>

        {/* Calorie Tracker */}
        <CalorieTracker
          goal={dailyGoals.calories}
          current={currentIntake.calories}
        />

        {/* Macro Breakdown */}
        <MacroBreakdown
          goals={dailyGoals}
          current={currentIntake}
        />

        {/* Meal Plan */}
        <MealPlan />

        {/* Food Log */}
        <FoodLog />
      </ScrollView>
    </SafeAreaView>
  );
}