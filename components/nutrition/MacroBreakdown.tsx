import React from 'react';
import { View, Text } from 'react-native';
interface MacroBreakdownProps {
  goals: {
    protein: number;
    carbs: number;
    fat: number;
  };
  current: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export function MacroBreakdown({ goals, current }: MacroBreakdownProps) {
  const macros = [
    {
      name: 'Protein',
      current: current.protein,
      goal: goals.protein,
      color: 'bg-danger-500',
      bgColor: 'bg-danger-100',
      unit: 'g',
    },
    {
      name: 'Carbs',
      current: current.carbs,
      goal: goals.carbs,
      color: 'bg-warning-500',
      bgColor: 'bg-warning-100',
      unit: 'g',
    },
    {
      name: 'Fat',
      current: current.fat,
      goal: goals.fat,
      color: 'bg-success-500',
      bgColor: 'bg-success-100',
      unit: 'g',
    },
  ];

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-dark-900 mb-3">Macronutrients</Text>
      <View className="bg-white rounded-xl p-4 shadow-brutal">
        {macros.map((macro, index) => {
          const percentage = (macro.current / macro.goal) * 100;
          return (
            <View key={index} className="mb-4 last:mb-0">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-semibold text-dark-900">{macro.name}</Text>
                <Text className="text-dark-600">
                  {macro.current}{macro.unit} / {macro.goal}{macro.unit}
                </Text>
              </View>
              <View className={`h-2 rounded-full ${macro.bgColor}`}>
                <View
                  className={`h-2 rounded-full ${macro.color}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </View>
              <Text className="text-right text-sm text-dark-500 mt-1">
                {Math.round(percentage)}%
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}