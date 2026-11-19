/**
 * Notifications Repository
 */

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    category: 'orders',
    type: 'ORDER',
    status: 'unread',
    read: false,
    group: 'TODAY',
    icon: 'shopping-bag',
    iconType: 'blush',
    title: 'New order #1042',
    time: '10 min ago',
    timestamp: '10 min ago',
    body: 'Class 4 complete set, Greenfield Public School',
    description: 'Class 4 complete set, Greenfield Public School',
    tag1: 'CBSE',
    tag2: '₹2,150 • Prepaid',
    tags: ['COD', '₹2,150', 'Prepaid'],
  },
  {
    id: 'notif-2',
    category: 'stock',
    type: 'LOW_STOCK',
    status: 'unread',
    read: false,
    group: 'TODAY',
    icon: 'warning',
    iconType: 'amber',
    title: 'Low stock: Grey Pinafore',
    time: '25 min ago',
    timestamp: '25 min ago',
    body: "Size 26 has only 3 left (St. Mary's Convent)",
    description: "Size 26 has only 3 left (St. Mary's Convent)",
    tag1: 'Critical · SKU-26-PIN',
    tag1Type: 'critical',
    tags: ['Critical', 'SKU-26-PIN'],
  },
  {
    id: 'notif-3',
    category: 'orders',
    type: 'DELIVERED',
    status: 'read',
    read: true,
    group: 'TODAY',
    icon: 'local-shipping',
    iconType: 'green',
    title: 'Order #1038 delivered',
    time: '2 hours ago',
    timestamp: '2 hours ago',
    body: 'Delivered to Pitampura, Delhi',
    description: 'Delivered to Pitampura, Delhi',
    tag1: 'BlueDart Track: DL-88912',
    tags: ['BlueDart Track: DL-88912'],
  },
  {
    id: 'notif-4',
    category: 'schools',
    type: 'SCHOOL_ADDED',
    status: 'read',
    read: true,
    group: 'EARLIER',
    icon: 'school',
    iconType: 'neutral',
    title: 'School added',
    time: 'Yesterday',
    timestamp: 'Yesterday',
    body: 'DAV Public Senior School now covers Nursery to Class 12',
    description: 'DAV Public Senior School now covers Nursery to Class 12',
    tag1: 'Affiliation: CBSE/NW-291',
    tags: ['Affiliation: CBSE9991-201'],
  },
  {
    id: 'notif-5',
    category: 'system',
    type: 'ITEM_PUBLISHED',
    status: 'read',
    read: true,
    group: 'EARLIER',
    icon: 'inventory',
    iconType: 'blush',
    title: 'Item published',
    time: '2 days ago',
    timestamp: '2 days ago',
    body: 'White Half Sleeve Shirt is now live for Greenfield Public',
    description: 'White Half Sleeve Shirt is now live for Greenfield Public',
    tag1: 'Catalog live (Sizes 20-38)',
    tags: ['Catalog live (Sizes 20-38)'],
  },
  {
    id: 'notif-6',
    category: 'orders',
    type: 'RETURN_REQUESTED',
    status: 'read',
    read: true,
    group: 'EARLIER',
    icon: 'swap-horiz',
    iconType: 'neutral',
    title: 'Return requested',
    time: '3 days ago',
    timestamp: '3 days ago',
    body: 'Order #1021, size exchange request from parent',
    description: 'Order #1021, size exchange request from parent',
    tag1: 'Exchange: Size 30 → Size 32',
    tags: ['Exchange: Size 30 -> Size 32'],
  },
];

let notificationsMemory = [...INITIAL_NOTIFICATIONS];

export const notificationsRepository = {
  async list() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...notificationsMemory];
  },

  async markAllRead() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    notificationsMemory = notificationsMemory.map((n) => ({
      ...n,
      status: 'read',
      read: true,
    }));
    return [...notificationsMemory];
  },

  async markRead(id) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    notificationsMemory = notificationsMemory.map((n) =>
      n.id === id ? { ...n, status: 'read', read: true } : n
    );
    return [...notificationsMemory];
  },
};
