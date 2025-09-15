import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, {
        displayName: fullName,
      });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        createdAt: new Date(),
        goals: {
          dailyCalories: 2000,
          weeklyWorkouts: 3,
          targetWeight: null,
        },
      });

      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-500">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6 pt-10">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="bg-white p-4 rounded-full mb-4 shadow-brutal">
              <Ionicons name="person-add" size={40} color="#3b82f6" />
            </View>
            <Text className="text-3xl font-bold text-white">Join FitnessTracker</Text>
            <Text className="text-primary-200 text-center mt-2">
              Start your fitness journey today
            </Text>
          </View>

          {/* Registration Form */}
          <View className="bg-white rounded-2xl p-6 shadow-brutal-lg mb-6">
            <Text className="text-2xl font-bold text-dark-900 mb-6 text-center">
              Create Account
            </Text>

            {/* Full Name Input */}
            <View className="mb-4">
              <Text className="text-dark-700 font-semibold mb-2">Full Name</Text>
              <View className="flex-row items-center bg-dark-100 rounded-lg px-4 py-3 border-2 border-dark-200">
                <Ionicons name="person-outline" size={20} color="#64748b" />
                <TextInput
                  value={formData.fullName}
                  onChangeText={(value) => updateFormData('fullName', value)}
                  placeholder="Enter your full name"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-dark-900"
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-dark-700 font-semibold mb-2">Email</Text>
              <View className="flex-row items-center bg-dark-100 rounded-lg px-4 py-3 border-2 border-dark-200">
                <Ionicons name="mail-outline" size={20} color="#64748b" />
                <TextInput
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  placeholder="Enter your email"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-dark-900"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-dark-700 font-semibold mb-2">Password</Text>
              <View className="flex-row items-center bg-dark-100 rounded-lg px-4 py-3 border-2 border-dark-200">
                <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
                <TextInput
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  placeholder="Enter your password"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-dark-900"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#64748b"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text className="text-dark-700 font-semibold mb-2">Confirm Password</Text>
              <View className="flex-row items-center bg-dark-100 rounded-lg px-4 py-3 border-2 border-dark-200">
                <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
                <TextInput
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                  placeholder="Confirm your password"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-dark-900"
                  secureTextEntry={!showPassword}
                />
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              className="bg-primary-500 py-4 rounded-lg mb-6 shadow-brutal-sm"
            >
              <Text className="text-white font-bold text-center text-lg">
                {loading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View className="flex-row justify-center">
              <Text className="text-dark-600">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text className="text-primary-600 font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}