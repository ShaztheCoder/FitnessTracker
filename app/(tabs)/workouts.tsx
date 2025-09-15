import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { WorkoutCard } from '@/components/workout/WorkoutCard';
import { FilterButtons } from '@/components/workout/FilterButtons';
import { useWorkouts } from '@/hooks/useWorkouts';

export default function WorkoutsScreen() {
  const { workouts, loading, refreshWorkouts } = useWorkouts();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { key: 'all', label: 'All' },
    { key: 'strength', label: 'Strength' },
    { key: 'cardio', label: 'Cardio' },
    { key: 'yoga', label: 'Yoga' },
    { key: 'hiit', label: 'HIIT' },
  ];

  const filteredWorkouts = workouts.filter(workout => 
    selectedFilter === 'all' || workout.type === selectedFilter
  );

  return (
    <SafeAreaView className="flex-1 bg-dark-50">
      <View className="px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-dark-900">Workouts</Text>
          <TouchableOpacity
            onPress={() => router.push('/workout/create')}
            className="bg-primary-500 px-4 py-2 rounded-lg flex-row items-center shadow-brutal-sm"
          >
            <Ionicons name="add" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Create</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <FilterButtons
          options={filterOptions}
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />
      </View>

      {/* Workouts List */}
      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={refreshWorkouts}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Ionicons name="fitness-outline" size={64} color="#94a3b8" />
            <Text className="text-dark-500 text-lg mt-4">No workouts yet</Text>
            <Text className="text-dark-400 text-center mt-2">
              Create your first workout to get started
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}