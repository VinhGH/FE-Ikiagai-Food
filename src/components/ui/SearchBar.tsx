import { View, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps extends TextInputProps {
  onSearch?: () => void;
}

export function SearchBar({ placeholder = "Tìm kiếm...", onSearch, className = '', ...props }: SearchBarProps) {
  return (
    <View className={`flex-row items-center bg-white h-12 rounded-full px-4 border border-outline-variant shadow-sm ${className}`}>
      <MaterialIcons name="search" size={24} color="#6B7280" />
      <TextInput
        className="flex-1 ml-2 text-base text-on-surface"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {onSearch && (
        <TouchableOpacity onPress={onSearch} className="ml-2 bg-primary rounded-full w-8 h-8 items-center justify-center">
          <MaterialIcons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}
