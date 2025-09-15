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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Note: Google Sign-In requires additional setup for React Native
    Alert.alert('Coming Soon', 'Google Sign-In will be available soon');
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-500">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-20">
          {/* Header */}
          <View className="items-center mb-10">
            <View className="bg-white p-4 rounded-full mb-4 shadow-brutal">
              <Ionicons name="fitness" size={40} color="#3b82f6" />
            </View>
            <Text className="text-3xl font-bold text-white">FitnessTracker</Text>
            <Text className="text-primary-200 text-center mt-2">
              Track your fitness journey
            </Text>
          </View>

          {/* Login Form */}
          <View className="bg-white rounded-2xl p-6 shadow-brutal-lg">
            <Text className="text-2xl font-bold text-dark-900 mb-6 text-center">
              Welcome Back
            </Text>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-dark-700 font-semibold mb-2">Email</Text>
              <View className="flex-row items-center bg-dark-100 rounded-lg px-4 py-3 border-2 border-dark-200">
                <Ionicons name="mail-outline" size={20} color="#64748b" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-dark-900"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-dark-700 font-semibold mb-2">Password</Text>
              <View className="flex-row items-center bg-dark-100 rounded-lg px-4 py-3 border-2 border-dark-200">
                <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
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

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleEmailLogin}
              disabled={loading}
              className="bg-primary-500 py-4 rounded-lg mb-4 shadow-brutal-sm"
            >
              <Text className="text-white font-bold text-center text-lg">
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => router.push('/(auth)/forgot-password')}
              className="mb-4"
            >
              <Text className="text-primary-600 text-center font-semibold">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-dark-300" />
              <Text className="text-dark-500 px-4">or</Text>
              <View className="flex-1 h-px bg-dark-300" />
            </View>

            {/* Google Login */}
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className="flex-row items-center justify-center bg-white border-2 border-dark-300 py-4 rounded-lg mb-6 shadow-brutal-sm"
            >
              <Ionicons name="logo-google" size={20} color="#ea4335" />
              <Text className="text-dark-700 font-semibold ml-3">
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-dark-600">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-primary-600 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}