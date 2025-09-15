import React from 'react';
import { View, Text } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className }: CardProps) {
  return (
    <View className={`bg-white rounded-xl p-4 shadow-brutal ${className || ''}`}>
      {title && (
        <Text className="text-lg font-semibold text-dark-900 mb-3">{title}</Text>
      )}
      {children}
    </View>
  );
}