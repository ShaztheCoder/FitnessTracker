import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email for password reset instructions.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-500">
      <View className="flex-1 px-6 pt-20">
        {/* Header */}
        <View className="items-center mb-10">
          <View className="bg-white p-4 rounded-full mb-4 shadow-brutal">
            <Ionicons name="key" size={40} color="#3b82f6" />
          </View>
          <Text className="text-3xl font-bold text-white">Reset Password</Text>
          <Text className="text-primary-200 text-center mt-2">
            Enter your email to receive reset instructions
          </Text>
        </View>

        {/* Reset Form */}
        <View className="bg-white rounded-2xl p-6 shadow-brutal-lg">
          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-dark-700 font-semibold mb-2">Email Address</Text>
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

          {/* Reset Button */}
          <TouchableOpacity
            onPress={handleResetPassword}
            disabled={loading}
            className="bg-primary-500 py-4 rounded-lg mb-4 shadow-brutal-sm"
          >
            <Text className="text-white font-bold text-center text-lg">
              {loading ? 'Sending...' : 'Send Reset Email'}
            </Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-primary-600 text-center font-semibold">
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}