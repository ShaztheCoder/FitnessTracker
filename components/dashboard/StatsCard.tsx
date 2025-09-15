import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export function StatsCard({ title, value, unit, icon, color }: StatsCardProps) {
  const colorClasses = {
    primary: { bg: 'bg-primary-100', text: 'text-primary-600', iconColor: '#2563eb' },
    secondary: { bg: 'bg-secondary-100', text: 'text-secondary-600', iconColor: '#0284c7' },
    success: { bg: 'bg-success-100', text: 'text-success-600', iconColor: '#16a34a' },
    warning: { bg: 'bg-warning-100', text: 'text-warning-600', iconColor: '#d97706' },
    danger: { bg: 'bg-danger-100', text: 'text-danger-600', iconColor: '#dc2626' },
  };

  const { bg, text, iconColor } = colorClasses[color];

  return (
    <View className={`${bg} rounded-xl p-4 mb-3 shadow-brutal-sm flex-1 mx-1`}>
      <View className="flex-row items-center mb-2">
        <Ionicons name={icon} size={24} color={iconColor} />
        <Text className="text-dark-600 text-sm ml-2 flex-1">{title}</Text>
      </View>
      <Text className={`text-2xl font-bold ${text}`}>
        {value.toLocaleString()}
      </Text>
      <Text className="text-dark-500 text-sm">{unit}</Text>
    </View>
  );
}