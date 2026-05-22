import { create } from 'zustand';

export interface IOrderItem {
  name: string;
  quantity: number;
}

export interface IOrder {
  id: string;
  shopName: string;
  shopImage: string;
  items: IOrderItem[];
  totalPrice: number;
  date: string;
  status: 'ongoing' | 'completed' | 'cancelled';
  statusText: string;
  statusColor: string;
  statusBg: string;
  iconName: string;
}

interface OrderState {
  ongoingOrders: IOrder[];
  pastOrders: IOrder[];
  cancelOrder: (id: string) => void;
  reorderItems: (order: IOrder, addToCart: any) => void;
  getOngoingOrdersCount: () => number;
  addOrder: (shopName: string, shopImage: string, items: IOrderItem[], totalPrice: number) => void;
}

const INITIAL_ONGOING_ORDERS: IOrder[] = [
  {
    id: 'o1',
    shopName: 'Bún Chả Sinh Từ - Nguyễn Phong Sắc',
    shopImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop',
    items: [
      { name: 'Suất Bún Chả Đặc Biệt', quantity: 2 },
      { name: 'Nem cua bể (cái)', quantity: 2 },
      { name: 'Trà đá', quantity: 2 }
    ],
    totalPrice: 165000,
    date: 'Hôm nay, 15:30',
    status: 'ongoing',
    statusText: 'Tài xế đang giao hàng',
    statusColor: '#0284c7',
    statusBg: '#e0f2fe',
    iconName: 'delivery-dining'
  }
];

const INITIAL_PAST_ORDERS: IOrder[] = [
  {
    id: 'o2',
    shopName: 'Gogi House - Nướng Hàn Quốc',
    shopImage: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=200&auto=format&fit=crop',
    items: [
      { name: 'Combo Nướng Thượng Hạng', quantity: 1 },
      { name: 'Canh Kim Chi', quantity: 1 }
    ],
    totalPrice: 420000,
    date: '20 Th5, 19:15',
    status: 'completed',
    statusText: 'Đã hoàn thành',
    statusColor: '#16a34a',
    statusBg: '#dcfce7',
    iconName: 'restaurant'
  },
  {
    id: 'o3',
    shopName: 'Highlands Coffee - Hàm Nghi',
    shopImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=200&auto=format&fit=crop',
    items: [
      { name: 'Phin Sữa Đá Size L', quantity: 2 },
      { name: 'Bánh Mì Que Pate', quantity: 3 }
    ],
    totalPrice: 115000,
    date: '18 Th5, 08:30',
    status: 'completed',
    statusText: 'Đã hoàn thành',
    statusColor: '#16a34a',
    statusBg: '#dcfce7',
    iconName: 'local-cafe'
  },
  {
    id: 'o4',
    shopName: 'Trà Sữa KOI Thé - Nguyễn Văn Linh',
    shopImage: 'https://images.unsplash.com/photo-1558857563-b371034d7088?q=80&w=200&auto=format&fit=crop',
    items: [
      { name: 'Lục Trà Trân Châu (M)', quantity: 2 }
    ],
    totalPrice: 90000,
    date: '15 Th5, 14:00',
    status: 'cancelled',
    statusText: 'Đã hủy đơn',
    statusColor: '#dc2626',
    statusBg: '#fee2e2',
    iconName: 'local-cafe'
  }
];

export const useOrderStore = create<OrderState>((set, get) => ({
  ongoingOrders: INITIAL_ONGOING_ORDERS,
  pastOrders: INITIAL_PAST_ORDERS,
  cancelOrder: (id) => {
    set((state) => {
      const orderToCancel = state.ongoingOrders.find((o) => o.id === id);
      if (!orderToCancel) return state;

      const updatedOngoing = state.ongoingOrders.filter((o) => o.id !== id);
      const cancelledOrder: IOrder = {
        ...orderToCancel,
        status: 'cancelled',
        statusText: 'Đã hủy đơn',
        statusColor: '#dc2626',
        statusBg: '#fee2e2'
      };

      return {
        ongoingOrders: updatedOngoing,
        pastOrders: [cancelledOrder, ...state.pastOrders]
      };
    });
  },
  reorderItems: (order, addToCart) => {
    order.items.forEach((item) => {
      addToCart(
        {
          id: `food-${Math.random()}`,
          name: item.name,
          price: order.totalPrice / (order.items.reduce((sum, i) => sum + i.quantity, 0) || 1),
          image: order.shopImage,
          shopId: 'shop-1'
        },
        item.quantity
      );
    });
  },
  getOngoingOrdersCount: () => {
    return get().ongoingOrders.length;
  },
  addOrder: (shopName, shopImage, items, totalPrice) => {
    set((state) => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      const newOrder: IOrder = {
        id: `o-${Date.now()}`,
        shopName,
        shopImage,
        items,
        totalPrice,
        date: `Hôm nay, ${timeStr}`,
        status: 'ongoing',
        statusText: 'Đang chuẩn bị',
        statusColor: '#0284c7',
        statusBg: '#e0f2fe',
        iconName: 'delivery-dining'
      };
      return {
        ongoingOrders: [newOrder, ...state.ongoingOrders]
      };
    });
  }
}));
