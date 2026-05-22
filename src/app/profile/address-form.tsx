import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAddressStore, type AddressLabel } from '../../store/addressStore';

type LabelOption = {
  value: AddressLabel;
  label: string;
  icon: string;
  color: string;
  bg: string;
};

const LABEL_OPTIONS: LabelOption[] = [
  { value: 'home', label: 'Nhà', icon: 'home', color: '#059669', bg: '#ECFDF5' },
  { value: 'work', label: 'Cơ quan', icon: 'business', color: '#2563EB', bg: '#EFF6FF' },
  { value: 'other', label: 'Địa điểm khác', icon: 'location-on', color: '#7C3AED', bg: '#F5F3FF' },
];

// Mock popular addresses for quick search suggestions
const SUGGESTIONS = [
  'Bệnh viện Đà Nẵng, 124 Hải Phòng, Hải Châu, Đà Nẵng',
  'Sân bay Quốc tế Đà Nẵng, 02 Duy Tân, Hải Châu, Đà Nẵng',
  'Đại học Bách Khoa Đà Nẵng, 54 Nguyễn Lương Bằng, Đà Nẵng',
  'Vincom Plaza Đà Nẵng, 910A Ngô Quyền, An Hải Bắc, Đà Nẵng',
  'Trung tâm Hành chính Đà Nẵng, 24 Trần Phú, Hải Châu, Đà Nẵng',
];

export default function AddressFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { addresses, addAddress, updateAddress } = useAddressStore();

  const isEditing = !!id;
  const existing = isEditing ? addresses.find((a) => a.id === id) : null;

  // Form state
  const [selectedLabel, setSelectedLabel] = useState<AddressLabel>(
    existing?.label ?? 'home'
  );
  const [title, setTitle] = useState(existing?.title ?? '');
  const [address, setAddress] = useState(existing?.address ?? '');
  const [note, setNote] = useState(existing?.note ?? '');
  const [isDefault, setIsDefault] = useState(existing?.isDefault ?? false);
  const [addressQuery, setAddressQuery] = useState(existing?.address ?? '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-fill title from label when not manually set
  useEffect(() => {
    if (!isEditing) {
      const cfg = LABEL_OPTIONS.find((l) => l.value === selectedLabel);
      setTitle(cfg?.label ?? '');
    }
  }, [selectedLabel, isEditing]);

  const handleSelectSuggestion = (s: string) => {
    setAddress(s);
    setAddressQuery(s);
    setShowSuggestions(false);
  };

  const handleSave = async () => {
    if (!address.trim()) {
      Alert.alert('Thiếu địa chỉ', 'Vui lòng nhập địa chỉ cụ thể.');
      return;
    }
    const finalTitle = title.trim() || LABEL_OPTIONS.find((l) => l.value === selectedLabel)?.label || 'Địa điểm';

    setIsSaving(true);
    try {
      if (isEditing && id) {
        await updateAddress(id, {
          label: selectedLabel,
          title: finalTitle,
          address: address.trim(),
          note: note.trim() || undefined,
          isDefault,
        });
      } else {
        await addAddress({
          label: selectedLabel,
          title: finalTitle,
          address: address.trim(),
          note: note.trim() || undefined,
          isDefault,
        });
      }
      router.back();
    } finally {
      setIsSaving(false);
    }
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
        <Text className="flex-1 text-base font-black text-slate-800">
          {isEditing ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Label selector */}
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
            Loại địa chỉ
          </Text>
          <View className="flex-row gap-2 mb-5">
            {LABEL_OPTIONS.map((opt) => {
              const isSelected = selectedLabel === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => setSelectedLabel(opt.value)}
                  activeOpacity={0.8}
                  className="flex-1 rounded-2xl border-2 py-3 items-center gap-1"
                  style={{
                    borderColor: isSelected ? opt.color : '#E2E8F0',
                    backgroundColor: isSelected ? opt.bg : 'white',
                  }}
                >
                  <MaterialIcons
                    name={opt.icon as any}
                    size={22}
                    color={isSelected ? opt.color : '#94A3B8'}
                  />
                  <Text
                    className="text-xs font-bold"
                    style={{ color: isSelected ? opt.color : '#64748B' }}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Label / tên hiển thị */}
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
            Tên hiển thị
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="VD: Nhà, Cơ quan, Nhà bạn An..."
            placeholderTextColor="#94A3B8"
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium mb-5"
          />

          {/* Address search */}
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
            Địa chỉ cụ thể
          </Text>
          <View className="relative mb-1">
            <View className="bg-white border border-slate-200 rounded-xl flex-row items-center px-3">
              <MaterialIcons name="search" size={20} color="#94A3B8" />
              <TextInput
                value={addressQuery}
                onChangeText={(text) => {
                  setAddressQuery(text);
                  setAddress(text);
                  setShowSuggestions(text.length > 0);
                }}
                onFocus={() => setShowSuggestions(addressQuery.length > 0)}
                placeholder="Tìm kiếm địa chỉ..."
                placeholderTextColor="#94A3B8"
                className="flex-1 py-3 px-2 text-sm text-slate-800"
                returnKeyType="done"
                onSubmitEditing={() => setShowSuggestions(false)}
              />
              {addressQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setAddressQuery('');
                    setAddress('');
                    setShowSuggestions(false);
                  }}
                >
                  <MaterialIcons name="close" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Suggestions dropdown */}
          {showSuggestions && (
            <View className="bg-white border border-slate-200 rounded-xl mb-3 overflow-hidden shadow-sm">
              {SUGGESTIONS.filter((s) =>
                s.toLowerCase().includes(addressQuery.toLowerCase())
              )
                .slice(0, 4)
                .map((s, i, arr) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => handleSelectSuggestion(s)}
                    className={`flex-row items-center px-3 py-3 gap-3 ${
                      i < arr.length - 1 ? 'border-b border-slate-100' : ''
                    }`}
                  >
                    <MaterialIcons name="location-on" size={16} color="#94A3B8" />
                    <Text className="text-sm text-slate-700 flex-1" numberOfLines={1}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}

          {/* Use GPS */}
          <TouchableOpacity
            className="flex-row items-center gap-2 mb-5 py-2"
            onPress={() => {
              Alert.alert(
                'Dùng vị trí hiện tại',
                'Tính năng GPS đang được tích hợp với bản đồ. Vui lòng nhập địa chỉ thủ công.'
              );
            }}
          >
            <MaterialIcons name="my-location" size={18} color="#2563EB" />
            <Text className="text-sm font-semibold text-blue-600">
              Dùng vị trí hiện tại (GPS)
            </Text>
          </TouchableOpacity>

          {/* Note */}
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
            Ghi chú thêm (tùy chọn)
          </Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="VD: Tầng 3, phòng 301, cổng màu xanh..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={2}
            textAlignVertical="top"
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 mb-5 min-h-[70px]"
          />

          {/* Set as default toggle */}
          <TouchableOpacity
            onPress={() => setIsDefault((v) => !v)}
            className="flex-row items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 mb-6"
            activeOpacity={0.8}
          >
            <View
              className="w-6 h-6 rounded-full border-2 items-center justify-center"
              style={{
                borderColor: isDefault ? '#059669' : '#CBD5E1',
                backgroundColor: isDefault ? '#059669' : 'white',
              }}
            >
              {isDefault && <MaterialIcons name="check" size={14} color="white" />}
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-slate-800">Đặt làm địa chỉ mặc định</Text>
              <Text className="text-xs text-slate-500 mt-0.5">
                Tự động chọn địa chỉ này khi đặt hàng
              </Text>
            </View>
          </TouchableOpacity>

          {/* Save button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={isSaving || !address.trim()}
            className="rounded-2xl py-4 items-center justify-center"
            style={{
              backgroundColor: !address.trim() ? '#E2E8F0' : '#059669',
            }}
            activeOpacity={0.85}
          >
            <Text
              className="font-black text-sm"
              style={{ color: !address.trim() ? '#94A3B8' : 'white' }}
            >
              {isSaving ? 'Đang lưu...' : isEditing ? 'Cập nhật địa chỉ' : 'Lưu địa chỉ'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
