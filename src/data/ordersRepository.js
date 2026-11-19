import { ORDER_STATUS } from '../constants';

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} school
 * @property {string} schoolFull
 * @property {string} item
 * @property {string} time
 * @property {number} amount
 * @property {'New' | 'Packed' | 'Delivered'} status
 */

/**
 * @typedef {Object} LowStockItem
 * @property {string} id
 * @property {string} name
 * @property {string} school
 * @property {string} size
 * @property {number} unitsLeft
 */

const INITIAL_ORDERS = [
  {
    id: '#1042',
    school: 'Greenfield Public',
    schoolFull: 'Greenfield Public School',
    item: 'Class 4 Complete Set',
    time: 'Today, 10:14 AM',
    amount: 2150,
    status: ORDER_STATUS.NEW,
  },
  {
    id: '#1041',
    school: "St. Mary's Convent",
    schoolFull: "St. Mary's Convent",
    item: 'Grey Pinafore (Size 26)',
    time: 'Today, 09:42 AM',
    amount: 680,
    status: ORDER_STATUS.PACKED,
  },
  {
    id: '#1040',
    school: 'DAV Public Senior',
    schoolFull: 'DAV Public Senior School',
    item: 'Navy Trousers (Size 30)',
    time: 'Today, 08:15 AM',
    amount: 590,
    status: ORDER_STATUS.DELIVERED,
  },
  {
    id: '#1039',
    school: 'Greenfield Public',
    schoolFull: 'Greenfield Public School',
    item: 'White Half Sleeve Shirt',
    time: 'Yesterday, 06:50 PM',
    amount: 449,
    status: ORDER_STATUS.DELIVERED,
  },
];

const INITIAL_LOW_STOCK = [
  {
    id: 'low-1',
    name: 'Grey Pinafore',
    school: "St. Mary's Convent",
    size: 'Size 26',
    unitsLeft: 3,
  },
  {
    id: 'low-2',
    name: 'Navy Trousers',
    school: 'DAV Public Senior',
    size: 'Size 24',
    unitsLeft: 4,
  },
  {
    id: 'low-3',
    name: 'White Half Sleeve Shirt',
    school: 'Greenfield Public',
    size: 'Size 28',
    unitsLeft: 2,
  },
];

let ordersMemory = [...INITIAL_ORDERS];
let lowStockMemory = [...INITIAL_LOW_STOCK];

export const ordersRepository = {
  async listRecent() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...ordersMemory];
  },

  async listLowStock() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...lowStockMemory];
  },

  async getDashboardSummary() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return {
      ordersToday: 24,
      ordersDiff: '+6 vs yesterday',
      revenue: 42860,
      revenueDiff: '+14% vs avg',
      activeSkus: 186,
      schoolsCount: 3,
      lowStockCount: 7,
      targetPercent: 74,
      actionItemsCount: 3,
    };
  },
};
