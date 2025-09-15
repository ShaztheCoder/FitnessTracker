import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface WeightChartProps {
  period: string;
}

export function WeightChart({ period }: WeightChartProps) {
  const screenWidth = Dimensions.get('window').width - 32;
  
  const getDataForPeriod = (period: string) => {
    switch (period) {
      case '1W':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [70.2, 70.0, 69.8, 69.9, 69.7, 69.5, 69.3],
        };
      case '1M':
        return {
          labels: ['W1', 'W2', 'W3', 'W4'],
          data: [70.5, 70.0, 69.5, 69.0],
        };
      default:
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [72, 71, 70.5, 70, 69.5, 69],
        };
    }
  };

  const chartData = getDataForPeriod(period);
  
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#22c55e',
    },
  };

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-dark-900 mb-3">Weight Progress</Text>
      <View className="bg-white rounded-xl shadow-brutal p-4">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-2xl font-bold text-success-600">69.3 kg</Text>
            <Text className="text-dark-500">Current Weight</Text>
          </View>
          <View className="items-end">
            <Text className="text-success-600 font-semibold">-1.2 kg</Text>
            <Text className="text-dark-500 text-sm">This {period}</Text>
          </View>
        </View>
        <LineChart
          data={data}
          width={screenWidth - 64}
          height={200}
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 8,
          }}
        />
      </View>
    </View>
  );
}