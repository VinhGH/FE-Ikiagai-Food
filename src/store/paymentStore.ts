import { create } from 'zustand';

export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'payment' | 'deposit';
  paymentMethod: string;
}

export interface IPaymentMethod {
  id: string;
  name: string;
  type: 'wallet' | 'other';
  icon: string;
  detail?: string;
  balance?: number;
}

interface PaymentState {
  egreenBalance: number;
  selectedMethod: string;
  transactions: ITransaction[];
  paymentMethods: IPaymentMethod[];
  selectMethod: (id: string) => void;
  depositEGreen: (amount: number) => void;
  deductEGreen: (amount: number) => boolean;
  addTransaction: (title: string, amount: number, type: 'payment' | 'deposit', paymentMethod: string) => void;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  egreenBalance: 100, // Mặc định 100đ giống như trong hình ảnh
  selectedMethod: 'cash', // Mặc định là Tiền mặt
  transactions: [
    {
      id: 'tx-init',
      title: 'Tạo tài khoản thành công',
      amount: 100,
      date: '22/05/2026 10:00',
      type: 'deposit',
      paymentMethod: 'egreen'
    }
  ],
  paymentMethods: [
    { id: 'shopeepay', name: 'ShopeePay', type: 'wallet', icon: 'payment', detail: '**4751' },
    { id: 'zalopay', name: 'Zalopay', type: 'wallet', icon: 'payment', detail: '**4751' },
    { id: 'egreen', name: 'Thẻ E-Green', type: 'other', icon: 'credit-card', balance: 100 },
    { id: 'cash', name: 'Tiền mặt khi nhận hàng (COD)', type: 'other', icon: 'money' },
    { id: 'momo', name: 'Ví MoMo', type: 'other', icon: 'payment' },
    { id: 'card', name: 'Thẻ Visa / Mastercard', type: 'other', icon: 'credit-card' },
  ],
  selectMethod: (id) => set({ selectedMethod: id }),
  depositEGreen: (amount) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const newTx: ITransaction = {
      id: `tx-${Date.now()}`,
      title: 'Nạp tiền vào Thẻ E-Green',
      amount,
      date: dateStr,
      type: 'deposit',
      paymentMethod: 'egreen',
    };
    set((state) => {
      const newBalance = state.egreenBalance + amount;
      return {
        egreenBalance: newBalance,
        transactions: [newTx, ...state.transactions],
        paymentMethods: state.paymentMethods.map(m => m.id === 'egreen' ? { ...m, balance: newBalance } : m)
      };
    });
  },
  deductEGreen: (amount) => {
    const state = get();
    if (state.egreenBalance < amount) {
      return false;
    }
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const newTx: ITransaction = {
      id: `tx-${Date.now()}`,
      title: 'Thanh toán đơn hàng',
      amount: -amount,
      date: dateStr,
      type: 'payment',
      paymentMethod: 'egreen',
    };
    set((state) => {
      const newBalance = state.egreenBalance - amount;
      return {
        egreenBalance: newBalance,
        transactions: [newTx, ...state.transactions],
        paymentMethods: state.paymentMethods.map(m => m.id === 'egreen' ? { ...m, balance: newBalance } : m)
      };
    });
    return true;
  },
  addTransaction: (title, amount, type, paymentMethod) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const newTx: ITransaction = {
      id: `tx-${Date.now()}`,
      title,
      amount,
      date: dateStr,
      type,
      paymentMethod,
    };
    set((state) => ({
      transactions: [newTx, ...state.transactions],
    }));
  }
}));
