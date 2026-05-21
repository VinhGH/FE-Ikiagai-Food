import { TouchableOpacity, Text, View, Image, ImageSourcePropType, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface IconButtonProps extends TouchableOpacityProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  imageSource?: ImageSourcePropType;
  label?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export function IconButton({ 
  icon, 
  imageSource,
  label, 
  size = 28, 
  color = '#00687b', 
  backgroundColor = '#e0f7fd',
  className = '',
  ...props 
}: IconButtonProps) {
  return (
    <TouchableOpacity 
      className={`items-center justify-center ${className}`} 
      activeOpacity={0.7}
      {...props}
    >
      <View 
        className="rounded-2xl items-center justify-center mb-2 shadow-sm"
        style={{ width: size * 2.2, height: size * 2.2, backgroundColor }}
      >
        {imageSource ? (
          <Image source={imageSource} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />
        ) : (
          <MaterialIcons name={icon as any} size={size} color={color} />
        )}
      </View>
      {label && <Text className="text-xs text-on-surface-variant font-medium text-center">{label}</Text>}
    </TouchableOpacity>
  );
}
