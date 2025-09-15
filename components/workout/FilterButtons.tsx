import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

interface FilterOption {
  key: string;
  label: string;
}

interface FilterButtonsProps {
  options: FilterOption[];
  selected: string;
  onSelect: (key: string) => void;
}

export function FilterButtons({ options, selected, onSelect }: FilterButtonsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          onPress={() => onSelect(option.key)}
          className={`px-4 py-2 mr-3 rounded-lg border-2 ${
            selected === option.key
              ? 'bg-primary-500 border-primary-500 shadow-brutal-sm'
              : 'bg-white border-dark-300'
          }`}
        >
          <Text
            className={`font-semibold ${
              selected === option.key ? 'text-white' : 'text-dark-700'
            }`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}