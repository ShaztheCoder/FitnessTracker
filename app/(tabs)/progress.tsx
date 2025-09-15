import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WeightChart } from '@/components/charts/WeightChart';
import { BodyMeasurements } from '@/components/progress/BodyMeasurements';
import { ProgressPhotos } from '@/components/progress/ProgressPhotos';
import { Achievements } from '@/components/progress/Achievements';

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const periodOptions = ['1W', '1M', '3M', '6M', '1Y'];

  return (
    <SafeAreaView className="flex-1 bg-dark-50">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-dark-900">Progress</Text>
          <TouchableOpacity className="bg-accent-500 px-4 py-2 rounded-lg shadow-brutal-sm">
            <Text className="text-white font-semibold">Add Entry</Text>
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View className="flex-row justify-center mb-6">
          {periodOptions.map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                selectedPeriod === period
                  ? 'bg-primary-500 shadow-brutal-sm'
                  : 'bg-dark-200'
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedPeriod === period ? 'text-white' : 'text-dark-700'
                }`}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Weight Chart */}
        <WeightChart period={selectedPeriod} />

        {/* Body Measurements */}
        <BodyMeasurements />

        {/* Progress Photos */}
        <ProgressPhotos />

        {/* Achievements */}
        <Achievements />
      </ScrollView>
    </SafeAreaView>
  );
}