import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { databaseService, WorkoutData } from '@/lib/database';

export default function WorkoutDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [workout, setWorkout] = useState<WorkoutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    loadWorkout();
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const loadWorkout = async () => {
    if (!id) return;
    
    try {
      const workoutData = await databaseService.getWorkout(id);
      setWorkout(workoutData);
    } catch (error) {
      console.error('Error loading workout:', error);
      Alert.alert('Error', 'Failed to load workout');
    } finally {
      setLoading(false);
    }
  };

  const startWorkout = () => {
    setIsActive(true);
    setTimer(0);
  };

  const stopWorkout = () => {
    setIsActive(false);
  };

  const completeWorkout = async () => {
    if (!workout) return;

    Alert.alert(
      'Complete Workout',
      'Are you sure you want to mark this workout as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: async () => {
            try {
              await databaseService.updateWorkout(workout.id!, {
                completedAt: new Date(),
                duration: Math.floor(timer / 60),
              });
              Alert.alert(
                'Workout Completed!',
                'Great job on completing your workout!',
                [{ text: 'OK', onPress: () => router.back() }]
              );
            } catch (error) {
              console.error('Error completing workout:', error);
              Alert.alert('Error', 'Failed to complete workout');
            }
          },
        },
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-dark-50 items-center justify-center">
        <Text className="text-dark-500">Loading workout...</Text>
      </SafeAreaView>
    );
  }

  if (!workout) {
    return (
      <SafeAreaView className="flex-1 bg-dark-50 items-center justify-center">
        <Ionicons name="alert-circle-outline" size={48} color="#94a3b8" />
        <Text className="text-dark-500 mt-2">Workout not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary-500 px-4 py-2 rounded-lg mt-4 shadow-brutal-sm"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark-50">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-dark-900">{workout.name}</Text>
          <View className="w-6" />
        </View>

        {/* Timer Card */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-brutal items-center">
          <Text className="text-3xl font-bold text-primary-600 mb-2">
            {formatTime(timer)}
          </Text>
          <Text className="text-dark-600 mb-4 capitalize">
            {workout.type} Workout
          </Text>
          
          <View className="flex-row space-x-4">
            {!isActive ? (
              <TouchableOpacity
                onPress={startWorkout}
                className="bg-success-500 px-6 py-3 rounded-lg shadow-brutal-sm flex-row items-center"
              >
                <Ionicons name="play" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Start</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={stopWorkout}
                  className="bg-danger-500 px-6 py-3 rounded-lg shadow-brutal-sm flex-row items-center"
                >
                  <Ionicons name="pause" size={20} color="white" />
                  <Text className="text-white font-semibold ml-2">Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={completeWorkout}
                  className="bg-primary-500 px-6 py-3 rounded-lg shadow-brutal-sm flex-row items-center"
                >
                  <Ionicons name="checkmark" size={20} color="white" />
                  <Text className="text-white font-semibold ml-2">Complete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Exercises */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-dark-900 mb-3">
            Exercises ({workout.exercises.length})
          </Text>
          
          {workout.exercises.map((exercise, index) => (
            <View key={exercise.id} className="bg-white rounded-xl p-4 mb-3 shadow-brutal">
              <Text className="text-lg font-semibold text-dark-900 mb-2">
                {exercise.name}
              </Text>
              
              {exercise.sets.map((set, setIndex) => (
                <View key={setIndex} className="flex-row justify-between items-center py-2 border-b border-dark-100 last:border-b-0">
                  <Text className="text-dark-600">Set {setIndex + 1}</Text>
                  <Text className="text-dark-900 font-semibold">
                    {set.weight ? `${set.weight}kg × ` : ''}{set.reps} reps
                  </Text>
                </View>
              ))}
              
              {exercise.notes && (
                <View className="mt-3 p-3 bg-dark-100 rounded-lg">
                  <Text className="text-dark-600 text-sm">{exercise.notes}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}