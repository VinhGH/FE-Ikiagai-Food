import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <View 
      className={`bg-white rounded-2xl shadow-sm border border-outline-variant ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
