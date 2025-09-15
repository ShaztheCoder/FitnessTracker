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
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentWorkouts } from '@/components/dashboard/RecentWorkouts';
import { ProgressChart } from '@/components/charts/ProgressChart';

export default function DashboardScreen() {
  console.log('✅ Home screen loaded');
  const { user, signOut } = useAuth();
  const [todayStats, setTodayStats] = useState({
    calories: 0,
    steps: 0,
    workouts: 0,
    activeMinutes: 0,
  });

  useEffect(() => {
    // Load today's stats from Firebase
    loadTodayStats();
  }, []);

  const loadTodayStats = async () => {
    // Implement Firebase query to get today's stats
    // This is a placeholder implementation
    setTodayStats({
      calories: 1850,
      steps: 8742,
      workouts: 2,
      activeMinutes: 65,
    });
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-50">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-dark-900">
              Good morning! 👋
            </Text>
            <Text className="text-dark-600 mt-1">
              {user?.displayName || 'Fitness Tracker'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSignOut}
            className="p-2 rounded-full bg-danger-100"
          >
            <Ionicons name="log-out-outline" size={24} color="#dc2626" />
          </TouchableOpacity>
        </View>

        {/* Daily Stats */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-dark-900 mb-3">
            Today's Stats
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <StatsCard
              title="Calories Burned"
              value={todayStats.calories}
              unit="kcal"
              icon="flame"
              color="danger"
            />
            <StatsCard
              title="Steps"
              value={todayStats.steps}
              unit="steps"
              icon="footsteps"
              color="primary"
            />
            <StatsCard
              title="Workouts"
              value={todayStats.workouts}
              unit="sessions"
              icon="fitness"
              color="success"
            />
            <StatsCard
              title="Active Time"
              value={todayStats.activeMinutes}
              unit="min"
              icon="time"
              color="warning"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <QuickActions />

        {/* Progress Chart */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-dark-900 mb-3">
            Weekly Progress
          </Text>
          <ProgressChart />
        </View>

        {/* Recent Workouts */}
        <RecentWorkouts />
      </ScrollView>
    </SafeAreaView>
  );
}