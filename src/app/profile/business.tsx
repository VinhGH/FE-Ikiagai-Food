import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

type Step = 'landing' | 'register' | 'pending';

const BENEFITS = [
  {
    icon: 'receipt-long',
    color: '#2563EB',
    bg: '#EFF6FF',
    title: 'Hóa đơn VAT tự động',
    desc: 'Mọi đơn hàng đều kèm hóa đơn VAT đầy đủ, hợp lệ cho kế toán.',
  },
  {
    icon: 'group',
    color: '#7C3AED',
    bg: '#F5F3FF',
    title: 'Quản lý nhân viên',
    desc: 'Thêm thành viên, đặt hạn mức chi tiêu mỗi người theo ngày / tháng.',
  },
  {
    icon: 'bar-chart',
    color: '#EA580C',
    bg: '#FFF7ED',
    title: 'Báo cáo chi tiêu',
    desc: 'Xem báo cáo chi tiết, xuất Excel/PDF để nộp kế toán nội bộ.',
  },
  {
    icon: 'local-offer',
    color: '#059669',
    bg: '#ECFDF5',
    title: 'Ưu đãi doanh nghiệp',
    desc: 'Chiết khấu riêng khi đặt số lượng lớn, deal bulk cho cả team.',
  },
];

function LandingStep({ onRegister }: { onRegister: () => void }) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 mb-6 items-center overflow-hidden"
        style={{ backgroundColor: '#1D4ED8' }}
      >
        <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center mb-3">
          <MaterialIcons name="business-center" size={32} color="white" />
        </View>
        <Text className="text-xl font-black text-white text-center mb-1">
          Ikigai for Business
        </Text>
        <Text className="text-sm text-blue-100 text-center leading-relaxed">
          Giải pháp đặt cơm doanh nghiệp thông minh — tiết kiệm thời gian, minh bạch chi phí
        </Text>

        <View className="flex-row gap-3 mt-4">
          {['500+ DN đang dùng', '98% hài lòng'].map((tag) => (
            <View key={tag} className="bg-white/20 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-bold text-white">{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Benefits */}
      <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
        Lợi ích nổi bật
      </Text>
      <View className="gap-3 mb-6">
        {BENEFITS.map((b) => (
          <View
            key={b.title}
            className="bg-white rounded-2xl border border-slate-100 p-4 flex-row items-start gap-3 shadow-sm"
          >
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: b.bg }}
            >
              <MaterialIcons name={b.icon as any} size={20} color={b.color} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-black text-slate-800 mb-0.5">{b.title}</Text>
              <Text className="text-xs text-slate-500 leading-relaxed">{b.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* How it works */}
      <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
        Quy trình 3 bước
      </Text>
      <View className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm">
        {[
          { step: '1', text: 'Đăng ký & nộp thông tin doanh nghiệp' },
          { step: '2', text: 'Xét duyệt trong 1–2 ngày làm việc' },
          { step: '3', text: 'Kích hoạt & mời nhân viên đặt hàng' },
        ].map(({ step, text }, i, arr) => (
          <View key={step} className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-full bg-blue-600 items-center justify-center">
              <Text className="text-sm font-black text-white">{step}</Text>
            </View>
            <Text className="flex-1 text-sm text-slate-700 font-medium">{text}</Text>
            {i < arr.length - 1 && (
              <View className="absolute left-4 top-10 w-0.5 h-6 bg-blue-100" />
            )}
          </View>
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        onPress={onRegister}
        className="bg-blue-600 rounded-2xl py-4 items-center shadow-sm mb-3"
        activeOpacity={0.85}
      >
        <Text className="text-white font-black text-sm">Đăng ký ngay — Miễn phí</Text>
      </TouchableOpacity>
      <Text className="text-center text-xs text-slate-400">
        Không mất phí dịch vụ. Chỉ trả khi nhân viên đặt hàng.
      </Text>
    </ScrollView>
  );
}

function RegisterStep({ onSubmit }: { onSubmit: () => void }) {
  const [companyName, setCompanyName] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const isValid =
    companyName.trim() &&
    taxCode.trim().length >= 10 &&
    companyAddress.trim() &&
    contactName.trim() &&
    contactEmail.includes('@');

  const Field = ({
    label,
    value,
    onChange,
    placeholder,
    keyboardType = 'default',
    required = true,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    keyboardType?: any;
    required?: boolean;
  }) => (
    <View className="mb-4">
      <Text className="text-xs font-bold text-slate-600 mb-1.5">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        keyboardType={keyboardType}
        className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800"
      />
    </View>
  );

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
        Thông tin doanh nghiệp
      </Text>

      <Field
        label="Tên công ty / doanh nghiệp"
        value={companyName}
        onChange={setCompanyName}
        placeholder="VD: Công ty TNHH Ikigai Vietnam"
      />
      <Field
        label="Mã số thuế (MST)"
        value={taxCode}
        onChange={setTaxCode}
        placeholder="VD: 0123456789"
        keyboardType="numeric"
      />
      <Field
        label="Địa chỉ công ty"
        value={companyAddress}
        onChange={setCompanyAddress}
        placeholder="Địa chỉ đăng ký kinh doanh"
      />

      <View className="h-px bg-slate-100 my-4" />
      <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
        Người đại diện liên hệ
      </Text>

      <Field
        label="Họ và tên"
        value={contactName}
        onChange={setContactName}
        placeholder="Người phụ trách tài khoản DN"
      />
      <Field
        label="Email công ty"
        value={contactEmail}
        onChange={setContactEmail}
        placeholder="name@company.com"
        keyboardType="email-address"
      />
      <Field
        label="Số điện thoại"
        value={contactPhone}
        onChange={setContactPhone}
        placeholder="+84..."
        keyboardType="phone-pad"
        required={false}
      />

      {/* Note */}
      <View className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex-row gap-2 mb-6">
        <MaterialIcons name="info-outline" size={16} color="#D97706" />
        <Text className="text-xs text-amber-700 flex-1 leading-relaxed">
          Thông tin sẽ được đội ngũ Ikigai xác minh trong 1–2 ngày làm việc. Bạn sẽ nhận thông báo qua email khi tài khoản được kích hoạt.
        </Text>
      </View>

      <TouchableOpacity
        onPress={isValid ? onSubmit : undefined}
        className="rounded-2xl py-4 items-center"
        style={{ backgroundColor: isValid ? '#2563EB' : '#E2E8F0' }}
        activeOpacity={isValid ? 0.85 : 1}
      >
        <Text
          className="font-black text-sm"
          style={{ color: isValid ? 'white' : '#94A3B8' }}
        >
          Gửi đăng ký
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function PendingStep() {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-24 h-24 rounded-full bg-blue-50 items-center justify-center mb-5">
        <MaterialIcons name="hourglass-top" size={44} color="#2563EB" />
      </View>
      <Text className="text-xl font-black text-slate-800 text-center mb-2">
        Đang xét duyệt!
      </Text>
      <Text className="text-sm text-slate-500 text-center leading-relaxed mb-6">
        Hồ sơ doanh nghiệp của bạn đã được gửi thành công. Đội ngũ Ikigai sẽ liên hệ xác minh trong vòng{' '}
        <Text className="font-bold text-blue-600">1–2 ngày làm việc</Text>.
      </Text>

      <View className="bg-white border border-slate-100 rounded-2xl p-4 w-full shadow-sm">
        {[
          { icon: 'email', color: '#059669', text: 'Thông báo kích hoạt qua email' },
          { icon: 'phone', color: '#2563EB', text: 'Hỗ trợ trực tiếp qua hotline: 1900 xxxx' },
          { icon: 'support-agent', color: '#7C3AED', text: 'Chat với tư vấn viên trong app' },
        ].map(({ icon, color, text }) => (
          <View key={text} className="flex-row items-center gap-3 py-2">
            <MaterialIcons name={icon as any} size={18} color={color} />
            <Text className="text-sm text-slate-600 flex-1">{text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function BusinessScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('landing');

  const STEP_TITLES: Record<Step, string> = {
    landing: 'Doanh nghiệp',
    register: 'Đăng ký tài khoản DN',
    pending: 'Đã gửi đăng ký',
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-slate-100">
        <TouchableOpacity
          onPress={() => {
            if (step === 'register') setStep('landing');
            else router.back();
          }}
          className="p-1 mr-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="flex-1 text-base font-black text-slate-800">
          {STEP_TITLES[step]}
        </Text>
        {step === 'landing' && (
          <View className="bg-blue-100 px-2.5 py-1 rounded-full">
            <Text className="text-[10px] font-bold text-blue-700">B2B</Text>
          </View>
        )}
      </View>

      {step === 'landing' && <LandingStep onRegister={() => setStep('register')} />}
      {step === 'register' && (
        <RegisterStep
          onSubmit={() => {
            setStep('pending');
          }}
        />
      )}
      {step === 'pending' && <PendingStep />}
    </SafeAreaView>
  );
}
