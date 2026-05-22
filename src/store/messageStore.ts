import { create } from 'zustand';

export interface IMessage {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  role: 'Shipper' | 'Nhà hàng' | 'Hỗ trợ';
  roleColor: string;
  roleTextColor: string;
}

interface MessageState {
  chats: IMessage[];
  addMessage: (chatId: string, text: string) => void;
  createChat: (chat: IMessage) => void;
  markAsRead: (chatId: string) => void;
  getUnreadCount: () => number;
}

const INITIAL_CHATS: IMessage[] = [
  {
    id: '1',
    name: 'Tài xế Nguyễn Văn A',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
    lastMessage: 'Tôi đã lấy món xong, đang trên đường giao cho bạn nhé.',
    time: '12:05',
    unreadCount: 1,
    role: 'Shipper',
    roleColor: 'bg-green-100',
    roleTextColor: 'text-green-700',
  },
  {
    id: '4',
    name: 'Tài xế Lê B',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80',
    lastMessage: 'Đã giao hàng thành công. Chúc bạn ngon miệng!',
    time: '10/05',
    unreadCount: 0,
    role: 'Shipper',
    roleColor: 'bg-green-100',
    roleTextColor: 'text-green-700',
  },
  {
    id: '2',
    name: 'C&N - Cà Phê Tui Pha',
    avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=150&q=80',
    lastMessage: 'Dạ quán đã nhận được ghi chú của bạn rồi ạ!',
    time: '11:50',
    unreadCount: 1,
    role: 'Nhà hàng',
    roleColor: 'bg-amber-100',
    roleTextColor: 'text-amber-700',
  },
  {
    id: '3',
    name: 'Hỗ trợ Ikigai Food',
    avatar: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=150&q=80',
    lastMessage: 'Cảm ơn bạn đã phản hồi, chúng tôi sẽ xử lý ngay.',
    time: 'Hôm qua',
    unreadCount: 0,
    role: 'Hỗ trợ',
    roleColor: 'bg-sky-100',
    roleTextColor: 'text-sky-700',
  }
];

export const useMessageStore = create<MessageState>((set, get) => ({
  chats: INITIAL_CHATS,
  addMessage: (chatId, text) => {
    set((state) => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      const chatExists = state.chats.some(c => c.id === chatId);
      
      if (!chatExists) return state;

      return {
        chats: state.chats.map((c) => {
          if (c.id === chatId) {
            return {
              ...c,
              lastMessage: text,
              time: timeStr,
              unreadCount: c.unreadCount + 1,
            };
          }
          return c;
        }),
      };
    });
  },
  createChat: (chat) => {
    set((state) => ({
      chats: [chat, ...state.chats.filter(c => c.id !== chat.id)],
    }));
  },
  markAsRead: (chatId) => {
    set((state) => ({
      chats: state.chats.map((c) => (c.id === chatId ? { ...c, unreadCount: 0 } : c)),
    }));
  },
  getUnreadCount: () => {
    return get().chats.reduce((sum, c) => sum + c.unreadCount, 0);
  }
}));
