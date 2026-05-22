import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ScanScreen() {
  const router = useRouter();
  const scanAnim = useRef(new Animated.Value(0)).current;

  // Simulate scanning line animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanAnim]);

  return (
    <View className="flex-1 bg-slate-900 relative">
      <StatusBar style="light" />

      {/* Simulated Camera Feed Background */}
      <View className="absolute inset-0 items-center justify-center">
        {/* Placeholder for camera blur/gradient */}
        <View className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black opacity-80" />
      </View>

      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-4 py-3 flex-row items-center justify-between z-10">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-black/40 rounded-full items-center justify-center border border-white/20"
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg tracking-wider">Nhận diện món ăn</Text>
          <TouchableOpacity className="w-10 h-10 bg-black/40 rounded-full items-center justify-center border border-white/20">
            <MaterialIcons name="flash-on" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Viewfinder */}
        <View className="flex-1 items-center justify-center">
          <View className="w-72 h-72 border-2 border-white/20 rounded-3xl relative overflow-hidden">
            {/* Corner Indicators */}
            <View className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#6ed6f2] rounded-tl-3xl" />
            <View className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#6ed6f2] rounded-tr-3xl" />
            <View className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#6ed6f2] rounded-bl-3xl" />
            <View className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#6ed6f2] rounded-br-3xl" />

            {/* Scanning Laser Line */}
            <Animated.View 
              style={{
                transform: [{
                  translateY: scanAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 280]
                  })
                }]
              }}
              className="w-full h-1 bg-[#6ed6f2] shadow-lg shadow-cyan-400 opacity-80"
            />
            
            {/* Glass reflection overlay */}
            <View className="absolute inset-0 bg-white/5" />
          </View>
          
          <Text className="text-white/80 mt-8 text-center px-10 leading-relaxed font-medium">
            Hướng camera vào món ăn để hệ thống nhận diện và tìm quán ăn bán món này nhé.
          </Text>
        </View>

        {/* Bottom Actions */}
        <View className="px-8 pb-10 flex-row items-center justify-around z-10">
          <TouchableOpacity className="items-center gap-2">
            <View className="w-12 h-12 bg-black/50 rounded-full items-center justify-center border border-white/20">
              <MaterialIcons name="photo-library" size={20} color="white" />
            </View>
            <Text className="text-white/70 text-xs font-bold">Thư viện</Text>
          </TouchableOpacity>
          
          {/* Main Shutter */}
          <TouchableOpacity className="w-20 h-20 rounded-full bg-white/20 items-center justify-center p-1">
            <View className="w-full h-full bg-white rounded-full items-center justify-center shadow-lg shadow-white/30">
              <MaterialIcons name="camera-alt" size={32} color="#6ed6f2" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="items-center gap-2">
            <View className="w-12 h-12 bg-black/50 rounded-full items-center justify-center border border-white/20">
              <MaterialIcons name="history" size={20} color="white" />
            </View>
            <Text className="text-white/70 text-xs font-bold">Lịch sử</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
