import React, { useState, useRef, useEffect } from 'react';
import { Animated, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps extends TextInputProps {
  onSearch?: () => void;
}

export function SearchBar({ placeholder = "Tìm kiếm...", onSearch, className = '', ...props }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const activeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let target = 0;
    if (isFocused) {
      target = 2;
    } else if (isHovered) {
      target = 1;
    }
    
    Animated.timing(activeAnim, {
      toValue: target,
      duration: 150,
      useNativeDriver: true, // Native driver is safe and performant for transforms
    }).start();
  }, [isFocused, isHovered]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  // State-driven color & shadow styles to prevent native color animation crashes
  const borderCol = isFocused ? '#6ed6f2' : isHovered ? '#a5f3fc' : '#E5E7EB';
  const borderW = isFocused ? 1.5 : 1;
  const shadowCol = isFocused || isHovered ? '#6ed6f2' : '#000000';
  const shadowOp = isFocused ? 0.18 : isHovered ? 0.08 : 0.05;
  const shadowRad = isFocused ? 12 : isHovered ? 6 : 3;
  const elevation = isFocused ? 4 : isHovered ? 2 : 1;
  const iconColor = isFocused || isHovered ? '#6ed6f2' : '#9CA3AF';

  // Animating only scale via native driver
  const scale = activeAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1.01, 1.015],
  });

  const iconScale = activeAnim.interpolate({
    inputRange: [0, 2],
    outputRange: [1, 1.05],
  });

  return (
    <Animated.View
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={[
        {
          borderColor: borderCol,
          borderWidth: borderW,
          shadowColor: shadowCol,
          shadowOpacity: shadowOp,
          shadowRadius: shadowRad,
          transform: [{ scale }],
          backgroundColor: '#FFFFFF',
          shadowOffset: { width: 0, height: 2 },
          elevation,
        },
      ]}
      className={`flex-row items-center h-12 rounded-full px-4 ${className}`}
    >
      <Animated.View style={{ transform: [{ scale: iconScale }] }}>
        <MaterialIcons name="search" size={24} color={iconColor} />
      </Animated.View>
      
      <TextInput
        className="flex-1 ml-2 text-base text-on-surface h-full"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      
      {onSearch && (
        <TouchableOpacity 
          onPress={onSearch} 
          className="ml-2 bg-primary rounded-full w-8 h-8 items-center justify-center"
          activeOpacity={0.8}
        >
          <MaterialIcons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

