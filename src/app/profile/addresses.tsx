import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAddressStore, type Address } from '../../store/addressStore';

const LABEL_CONFIG = {
  home: { icon: 'home', color: '#059669', bg: '#ECFDF5', label: 'Nhà' },
  work: { icon: 'business', color: '#2563EB', bg: '#EFF6FF', label: 'Cơ quan' },
  other: { icon: 'location-on', color: '#7C3AED', bg: '#F5F3FF', label: 'Địa điểm' },
} as const;

function AddressCard({
  item,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  item: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) {
  const cfg = LABEL_CONFIG[item.label];

  const showMenu = () => {
    Alert.alert(item.title, item.address, [
      { text: 'Sửa địa chỉ', onPress: onEdit },
      !item.isDefault
        ? { text: 'Đặt làm mặc định', onPress: onSetDefault }
        : null,
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () =>
          Alert.alert('Xác nhận xóa', `Bạn có chắc muốn xóa "${item.title}"?`, [
            { text: 'Hủy', style: 'cancel' },
            { text: 'Xóa', style: 'destructive', onPress: onDelete },
          ]),
      },
      { text: 'Đóng', style: 'cancel' },
    ].filter(Boolean) as any);
  };

  return (
    <View className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-3 overflow-hidden">
      {/* Default badge */}
      {item.isDefault && (
        <View className="bg-emerald-50 px-4 py-1.5 flex-row items-center gap-1.5 border-b border-emerald-100">
          <MaterialIcons name="check-circle" size={13} color="#059669" />
          <Text className="text-[11px] font-bold text-emerald-700 tracking-wide">
            ĐỊA CHỈ MẶC ĐỊNH
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={onEdit}
        activeOpacity={0.85}
        className="flex-row items-start p-4"
      >
        {/* Icon */}
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3 mt-0.5"
          style={{ backgroundColor: cfg.bg }}
        >
          <MaterialIcons name={cfg.icon as any} size={20} color={cfg.color} />
        </View>

        {/* Info */}
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="text-sm font-black text-slate-800">{item.title}</Text>
            <View
              className="px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: cfg.bg }}
            >
              <Text className="text-[10px] font-bold" style={{ color: cfg.color }}>
                {cfg.label}
              </Text>
            </View>
          </View>
          <Text className="text-xs text-slate-500 leading-relaxed" numberOfLines={2}>
            {item.address}
          </Text>
          {!!item.note && (
            <Text className="text-xs text-slate-400 mt-1 italic">📝 {item.note}</Text>
          )}
        </View>

        {/* More button */}
        <TouchableOpacity
          onPress={showMenu}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          className="ml-2 p-1"
        >
          <MaterialIcons name="more-vert" size={20} color="#94A3B8" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

export default function AddressesScreen() {
  const router = useRouter();
  const { addresses, isLoaded, loadAddresses, deleteAddress, setDefault } =
    useAddressStore();

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleEdit = useCallback(
    (addr: Address) => {
      router.push(`/profile/address-form?id=${addr.id}` as any);
    },
    [router]
  );

  const handleAdd = () => {
    router.push('/profile/address-form' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-slate-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-1 mr-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-base font-black text-slate-800">Địa chỉ đã lưu</Text>
          <Text className="text-xs text-slate-500">
            {addresses.length} địa chỉ
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleAdd}
          className="flex-row items-center gap-1 bg-emerald-500 px-3 py-2 rounded-full"
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={16} color="white" />
          <Text className="text-xs font-bold text-white">Thêm mới</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {!isLoaded ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#059669" />
        </View>
      ) : addresses.length === 0 ? (
        // Empty state
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-20 h-20 rounded-full bg-emerald-50 items-center justify-center mb-4">
            <MaterialIcons name="location-off" size={36} color="#059669" />
          </View>
          <Text className="text-lg font-black text-slate-800 text-center mb-2">
            Chưa có địa chỉ nào
          </Text>
          <Text className="text-sm text-slate-500 text-center leading-relaxed mb-6">
            Thêm địa chỉ để đặt hàng nhanh hơn, không cần nhập lại mỗi lần!
          </Text>
          <TouchableOpacity
            onPress={handleAdd}
            className="bg-emerald-500 px-6 py-3 rounded-2xl flex-row items-center gap-2"
            activeOpacity={0.8}
          >
            <MaterialIcons name="add-location-alt" size={20} color="white" />
            <Text className="text-sm font-bold text-white">Thêm địa chỉ đầu tiên</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Tip */}
          <View className="bg-sky-50 border border-sky-100 rounded-xl p-3 flex-row items-center gap-2 mb-4">
            <MaterialIcons name="info-outline" size={16} color="#0284C7" />
            <Text className="text-xs text-sky-700 flex-1 leading-relaxed">
              Địa chỉ mặc định sẽ được tự động chọn khi đặt hàng.
            </Text>
          </View>

          {/* Address list — default first */}
          {[...addresses]
            .sort((a, b) => (a.isDefault ? -1 : b.isDefault ? 1 : 0))
            .map((item) => (
              <AddressCard
                key={item.id}
                item={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteAddress(item.id)}
                onSetDefault={() => setDefault(item.id)}
              />
            ))}

          {/* Add more */}
          <TouchableOpacity
            onPress={handleAdd}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex-row items-center justify-center gap-2 mt-1"
            activeOpacity={0.7}
          >
            <MaterialIcons name="add-location-alt" size={20} color="#94A3B8" />
            <Text className="text-sm font-semibold text-slate-400">
              Thêm địa chỉ mới
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
