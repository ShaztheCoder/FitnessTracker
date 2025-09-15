import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  className?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  className,
}: ButtonProps) {
  const baseClasses = 'flex-row items-center justify-center rounded-lg shadow-brutal-sm';
  
  const variantClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    danger: 'bg-danger-500',
    success: 'bg-success-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
    disabled || loading ? 'opacity-50' : ''
  } ${className || ''}`;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={buttonClasses}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
              color="white"
              style={{ marginRight: title ? 8 : 0 }}
            />
          )}
          {title && (
            <Text className={`text-white font-semibold ${textSizeClasses[size]}`}>
              {title}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}