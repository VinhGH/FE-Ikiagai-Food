import { PropsWithChildren, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Pressable className="flex-row items-center gap-2 py-2 active:opacity-70" onPress={() => setIsOpen((value) => !value)}>
        <Text className="text-on-surface-variant">{isOpen ? '⌄' : '›'}</Text>
        <Text className="text-sm font-semibold text-on-surface">{title}</Text>
      </Pressable>
      {isOpen && <View className="mt-2 rounded-lg bg-surface-container-low p-4">{children}</View>}
    </View>
  );
}
