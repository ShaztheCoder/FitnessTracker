import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ProgressPhotos() {
  const photos = [
    { id: 1, date: '2025-09-01', url: 'https://via.placeholder.com/100x120' },
    { id: 2, date: '2025-08-01', url: 'https://via.placeholder.com/100x120' },
    { id: 3, date: '2025-07-01', url: 'https://via.placeholder.com/100x120' },
  ];

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-dark-900">Progress Photos</Text>
        <TouchableOpacity className="bg-accent-500 px-3 py-1 rounded-lg">
          <Text className="text-white font-semibold text-sm">Take Photo</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity className="bg-white rounded-xl p-6 shadow-brutal mr-3 items-center justify-center border-2 border-dashed border-dark-300">
          <Ionicons name="camera-outline" size={32} color="#94a3b8" />
          <Text className="text-dark-500 text-sm mt-2 text-center">Add New{'\n'}Photo</Text>
        </TouchableOpacity>
        
        {photos.map((photo) => (
          <View key={photo.id} className="mr-3">
            <View className="bg-white rounded-xl p-2 shadow-brutal">
              <Image 
                source={{ uri: photo.url }} 
                className="w-24 h-32 rounded-lg" 
                resizeMode="cover"
              />
            </View>
            <Text className="text-dark-600 text-xs text-center mt-2">
              {new Date(photo.date).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}