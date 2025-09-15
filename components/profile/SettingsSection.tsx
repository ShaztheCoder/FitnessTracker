import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
interface SettingsItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  action: () => void;
}

interface SettingsSectionProps {
  title: string;
  items: SettingsItem[];
}

export function SettingsSection({ title, items }: SettingsSectionProps) {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-dark-900 mb-3">{title}</Text>
      
      <View className="bg-white rounded-xl shadow-brutal">
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.action}
            className={`p-4 flex-row items-center justify-between ${
              index < items.length - 1 ? 'border-b border-dark-200' : ''
            }`}
          >
            <View className="flex-row items-center">
              <View className="bg-dark-100 p-2 rounded-lg mr-3">
                <Ionicons name={item.icon} size={20} color="#64748b" />
              </View>
              <Text className="font-semibold text-dark-900">{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}