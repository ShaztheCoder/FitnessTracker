import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  className?: string;
}

export function Input({
  label,
  icon,
  error,
  className,
  ...textInputProps
}: InputProps) {
  return (
    <View className={`mb-4 ${className || ''}`}>
      {label && (
        <Text className="text-dark-700 font-semibold mb-2">{label}</Text>
      )}
      <View className={`flex-row items-center bg-dark-100 rounded-lg px-4 py-3 border-2 ${
        error ? 'border-danger-500' : 'border-dark-200'
      }`}>
        {icon && (
          <Ionicons name={icon} size={20} color="#64748b" />
        )}
        <TextInput
          className={`flex-1 text-dark-900 ${icon ? 'ml-3' : ''}`}
          placeholderTextColor="#94a3b8"
          {...textInputProps}
        />
      </View>
      {error && (
        <Text className="text-danger-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}