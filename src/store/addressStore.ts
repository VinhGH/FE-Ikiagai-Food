import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADDRESSES_KEY = 'saved_addresses';

// ===== TYPES =====
export type AddressLabel = 'home' | 'work' | 'other';

export type Address = {
  id: string;
  label: AddressLabel;
  title: string;       // "Nhà", "Cơ quan", hoặc tên tùy chỉnh
  address: string;     // Địa chỉ đầy đủ
  note?: string;       // Tầng, số phòng, ghi chú...
  lat?: number;
  lng?: number;
  isDefault: boolean;
};

type AddressState = {
  addresses: Address[];
  isLoaded: boolean;

  // Actions
  loadAddresses: () => Promise<void>;
  addAddress: (addr: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: string, data: Partial<Omit<Address, 'id'>>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setDefault: (id: string) => Promise<void>;
};

// ===== HELPERS =====
const generateId = () => `addr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const persist = async (addresses: Address[]) => {
  await AsyncStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
};

// ===== STORE =====
export const useAddressStore = create<AddressState>((set, get) => ({
  addresses: [],
  isLoaded: false,

  loadAddresses: async () => {
    try {
      const raw = await AsyncStorage.getItem(ADDRESSES_KEY);
      const addresses: Address[] = raw ? JSON.parse(raw) : [];
      set({ addresses, isLoaded: true });
    } catch {
      set({ addresses: [], isLoaded: true });
    }
  },

  addAddress: async (addr) => {
    const newAddr: Address = { ...addr, id: generateId() };
    const current = get().addresses;

    // Nếu là địa chỉ đầu tiên, tự động đặt làm mặc định
    if (current.length === 0) newAddr.isDefault = true;

    // Nếu set isDefault = true, bỏ default của các địa chỉ khác
    let updated = addr.isDefault
      ? current.map((a) => ({ ...a, isDefault: false }))
      : [...current];

    updated = [...updated, newAddr];
    set({ addresses: updated });
    await persist(updated);
  },

  updateAddress: async (id, data) => {
    let updated = get().addresses.map((a) => {
      if (a.id !== id) {
        // Nếu đang set default cho địa chỉ khác, bỏ default của cái này
        if (data.isDefault) return { ...a, isDefault: false };
        return a;
      }
      return { ...a, ...data };
    });
    set({ addresses: updated });
    await persist(updated);
  },

  deleteAddress: async (id) => {
    let updated = get().addresses.filter((a) => a.id !== id);
    // Nếu xóa địa chỉ mặc định, đặt cái đầu tiên làm mặc định
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0] = { ...updated[0], isDefault: true };
    }
    set({ addresses: updated });
    await persist(updated);
  },

  setDefault: async (id) => {
    const updated = get().addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    set({ addresses: updated });
    await persist(updated);
  },
}));
