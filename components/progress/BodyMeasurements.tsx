import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function BodyMeasurements() {
  const measurements = [
    { name: 'Chest', value: 102, unit: 'cm', change: '+1.2' },
    { name: 'Waist', value: 85, unit: 'cm', change: '-2.1' },
    { name: 'Arms', value: 35, unit: 'cm', change: '+0.8' },
    { name: 'Thighs', value: 58, unit: 'cm', change: '+1.5' },
  ];

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-dark-900">Body Measurements</Text>
        <TouchableOpacity className="bg-primary-500 px-3 py-1 rounded-lg">
          <Text className="text-white font-semibold text-sm">Add</Text>
        </TouchableOpacity>
      </View>
      
      <View className="bg-white rounded-xl shadow-brutal">
        {measurements.map((measurement, index) => (
          <View 
            key={index} 
            className={`p-4 flex-row justify-between items-center ${
              index < measurements.length - 1 ? 'border-b border-dark-200' : ''
            }`}
          >
            <View className="flex-row items-center">
              <View className="bg-secondary-100 p-2 rounded-lg mr-3">
                <Ionicons name="body-outline" size={20} color="#0284c7" />
              </View>
              <Text className="font-semibold text-dark-900">{measurement.name}</Text>
            </View>
            
            <View className="items-end">
              <Text className="text-lg font-bold text-dark-900">
                {measurement.value} {measurement.unit}
              </Text>
              <Text className={`text-sm font-semibold ${
                measurement.change.startsWith('+') ? 'text-success-600' : 'text-danger-600'
              }`}>
                {measurement.change} cm
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}