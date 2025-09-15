import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { databaseService } from '@/lib/database';

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  notes?: string;
}

interface Set {
  weight?: number;
  reps?: number;
  duration?: number;
  distance?: number;
}

export default function CreateWorkoutScreen() {
  const { user } = useAuth();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutType, setWorkoutType] = useState<'strength' | 'cardio' | 'yoga' | 'hiit' | 'flexibility'>('strength');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

  const workoutTypes = [
    { key: 'strength', label: 'Strength', icon: 'barbell' },
    { key: 'cardio', label: 'Cardio', icon: 'heart' },
    { key: 'yoga', label: 'Yoga', icon: 'leaf' },
    { key: 'hiit', label: 'HIIT', icon: 'flash' },
    { key: 'flexibility', label: 'Flexibility', icon: 'body' },
  ];

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: [{ reps: 0, weight: 0 }],
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (exerciseId: string, field: string, value: string) => {
    setExercises(exercises.map(exercise => 
      exercise.id === exerciseId 
        ? { ...exercise, [field]: value }
        : exercise
    ));
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(exercise => 
      exercise.id === exerciseId 
        ? { ...exercise, sets: [...exercise.sets, { reps: 0, weight: 0 }] }
        : exercise
    ));
  };

  const updateSet = (exerciseId: string, setIndex: number, field: string, value: string) => {
    setExercises(exercises.map(exercise => 
      exercise.id === exerciseId 
        ? {
            ...exercise,
            sets: exercise.sets.map((set, index) => 
              index === setIndex 
                ? { ...set, [field]: parseFloat(value) || 0 }
                : set
            )
          }
        : exercise
    ));
  };

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
  };

  const saveWorkout = async () => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }

    if (exercises.length === 0) {
      Alert.alert('Error', 'Please add at least one exercise');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setLoading(true);
    try {
      const workoutData = {
        userId: user.uid,
        name: workoutName,
        type: workoutType,
        duration: 0, // Will be calculated during workout
        exercises: exercises.filter(ex => ex.name.trim()),
        createdAt: new Date(),
      };

      await databaseService.createWorkout(workoutData);
      Alert.alert(
        'Success',
        'Workout created successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('Error creating workout:', error);
      Alert.alert('Error', 'Failed to create workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-50">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-dark-900">Create Workout</Text>
          <TouchableOpacity
            onPress={saveWorkout}
            disabled={loading}
            className="bg-primary-500 px-4 py-2 rounded-lg shadow-brutal-sm"
          >
            <Text className="text-white font-semibold">
              {loading ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Workout Name */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-dark-900 mb-3">Workout Name</Text>
          <TextInput
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter workout name"
            className="bg-white rounded-lg px-4 py-3 border-2 border-dark-200 text-dark-900 shadow-brutal-sm"
            placeholderTextColor="#94a3b8"
          />
        </View>

        {/* Workout Type */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-dark-900 mb-3">Workout Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {workoutTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                onPress={() => setWorkoutType(type.key as any)}
                className={`px-4 py-3 mr-3 rounded-lg border-2 flex-row items-center ${
                  workoutType === type.key
                    ? 'bg-primary-500 border-primary-500 shadow-brutal-sm'
                    : 'bg-white border-dark-300'
                }`}
              >
                <Ionicons
                  name={type.icon as any}
                  size={20}
                  color={workoutType === type.key ? 'white' : '#64748b'}
                />
                <Text
                  className={`font-semibold ml-2 ${
                    workoutType === type.key ? 'text-white' : 'text-dark-700'
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Exercises */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold text-dark-900">Exercises</Text>
            <TouchableOpacity
              onPress={addExercise}
              className="bg-success-500 px-4 py-2 rounded-lg shadow-brutal-sm"
            >
              <Text className="text-white font-semibold">Add Exercise</Text>
            </TouchableOpacity>
          </View>

          {exercises.map((exercise, exerciseIndex) => (
            <View key={exercise.id} className="bg-white rounded-xl p-4 mb-4 shadow-brutal">
              <View className="flex-row justify-between items-center mb-3">
                <TextInput
                  value={exercise.name}
                  onChangeText={(value) => updateExercise(exercise.id, 'name', value)}
                  placeholder="Exercise name"
                  className="flex-1 text-lg font-semibold text-dark-900"
                  placeholderTextColor="#94a3b8"
                />
                <TouchableOpacity
                  onPress={() => removeExercise(exercise.id)}
                  className="ml-3"
                >
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>

              {/* Sets */}
              <View className="mb-3">
                <Text className="font-semibold text-dark-700 mb-2">Sets</Text>
                {exercise.sets.map((set, setIndex) => (
                  <View key={setIndex} className="flex-row items-center mb-2">
                    <Text className="w-8 text-dark-600">#{setIndex + 1}</Text>
                    <View className="flex-row flex-1">
                      <View className="flex-1 mr-2">
                        <Text className="text-xs text-dark-500 mb-1">Weight (kg)</Text>
                        <TextInput
                          value={set.weight?.toString() || ''}
                          onChangeText={(value) => updateSet(exercise.id, setIndex, 'weight', value)}
                          placeholder="0"
                          keyboardType="numeric"
                          className="bg-dark-100 px-3 py-2 rounded-lg text-dark-900"
                          placeholderTextColor="#94a3b8"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-xs text-dark-500 mb-1">Reps</Text>
                        <TextInput
                          value={set.reps?.toString() || ''}
                          onChangeText={(value) => updateSet(exercise.id, setIndex, 'reps', value)}
                          placeholder="0"
                          keyboardType="numeric"
                          className="bg-dark-100 px-3 py-2 rounded-lg text-dark-900"
                          placeholderTextColor="#94a3b8"
                        />
                      </View>
                    </View>
                  </View>
                ))}
                
                <TouchableOpacity
                  onPress={() => addSet(exercise.id)}
                  className="bg-dark-100 py-2 rounded-lg items-center mt-2"
                >
                  <Text className="text-dark-600 font-semibold">+ Add Set</Text>
                </TouchableOpacity>
              </View>

              {/* Notes */}
              <TextInput
                value={exercise.notes || ''}
                onChangeText={(value) => updateExercise(exercise.id, 'notes', value)}
                placeholder="Exercise notes (optional)"
                multiline
                numberOfLines={2}
                className="bg-dark-100 px-3 py-2 rounded-lg text-dark-900"
                placeholderTextColor="#94a3b8"
              />
            </View>
          ))}

          {exercises.length === 0 && (
            <View className="bg-white rounded-xl p-8 shadow-brutal items-center">
              <Ionicons name="fitness-outline" size={48} color="#94a3b8" />
              <Text className="text-dark-500 mt-2 text-center">
                No exercises added yet
              </Text>
              <Text className="text-dark-400 text-sm text-center mt-1">
                Tap "Add Exercise" to get started
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}