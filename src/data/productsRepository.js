import { PRODUCT_STATUS, LOW_STOCK_THRESHOLD } from '../constants';
import { PRODUCT_ASSETS } from '../constants/productImages';

/**
 * @typedef {Object} SizeStock
 * @property {number} size
 * @property {number} stock
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} schoolId
 * @property {string} school
 * @property {string} classes
 * @property {number} price
 * @property {number} mrp
 * @property {number} stock
 * @property {boolean} draft
 * @property {string} category
 * @property {'Boys' | 'Girls' | 'Unisex'} gender
 * @property {string} [sku]
 * @property {string} [image]
 * @property {string} description
 * @property {SizeStock[]} [sizes]
 */

export function getProductStatus(product) {
  if (product.draft) return PRODUCT_STATUS.DRAFT;
  if (product.stock === 0) return PRODUCT_STATUS.OUT_OF_STOCK;
  if (product.stock <= LOW_STOCK_THRESHOLD) return PRODUCT_STATUS.LOW_STOCK;
  return PRODUCT_STATUS.PUBLISHED;
}

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'White Half Sleeve Shirt',
    schoolId: 'greenfield-public-school',
    school: 'Greenfield Public School',
    classes: 'Class 3 to Class 5',
    price: 449,
    mrp: 520,
    stock: 75,
    draft: false,
    category: 'Shirts and tops',
    gender: 'Boys',
    sku: 'WHS-GFS-01',
    image: PRODUCT_ASSETS['prod-1'],
    photos: [PRODUCT_ASSETS['prod-1']],
    description:
      'Formal poly-cotton uniform shirt with embroidered school crest on pocket. Breathable, easy-iron fabric.',
    sizes: [
      { size: 22, stock: 34 },
      { size: 24, stock: 18 },
      { size: 26, stock: 3 },
      { size: 28, stock: 0 },
    ],
  },
  {
    id: 'prod-2',
    name: 'Grey Pinafore',
    schoolId: 'st-marys-convent',
    school: "St. Mary's Convent",
    classes: 'Nursery to Class 5',
    price: 680,
    mrp: 750,
    stock: 3,
    draft: false,
    category: 'Bottoms',
    gender: 'Girls',
    sku: 'GRP-SMC-02',
    image: PRODUCT_ASSETS['prod-2'],
    photos: [PRODUCT_ASSETS['prod-2']],
    description:
      'Pleated pinafore with adjustable side buckle straps and neat knife pleats.',
    sizes: [
      { size: 24, stock: 12 },
      { size: 26, stock: 3 },
    ],
  },
  {
    id: 'prod-3',
    name: 'Navy Trousers',
    schoolId: 'dav-public-senior-school',
    school: 'DAV Public Senior School',
    classes: 'Class 6 to Class 12',
    price: 590,
    mrp: 650,
    stock: 42,
    draft: false,
    category: 'Bottoms',
    gender: 'Boys',
    sku: 'NVT-DAV-03',
    image: PRODUCT_ASSETS['prod-3'],
    photos: [PRODUCT_ASSETS['prod-3']],
    description:
      'Deep navy uniform trousers with sharp center creases and reinforced waistband.',
    sizes: [
      { size: 28, stock: 14 },
      { size: 30, stock: 24 },
      { size: 32, stock: 4 },
    ],
  },
  {
    id: 'prod-4',
    name: 'Woolen V-Neck Sweater',
    schoolId: 'greenfield-public-school',
    school: 'Greenfield Public School',
    classes: 'Class 1 to Class 8',
    price: 850,
    mrp: 990,
    stock: 0,
    draft: false,
    category: 'Winter',
    gender: 'Unisex',
    sku: 'WVS-GFS-04',
    image: PRODUCT_ASSETS['prod-4'],
    photos: [PRODUCT_ASSETS['prod-4']],
    description:
      'Forest green acrylic knit sweater with ribbed cuffs and neck tipping.',
    sizes: [
      { size: 26, stock: 0 },
      { size: 28, stock: 0 },
    ],
  },
  {
    id: 'prod-5',
    name: 'School Striped Tie',
    schoolId: 'st-marys-convent',
    school: "St. Mary's Convent",
    classes: 'All Classes',
    price: 140,
    mrp: 160,
    stock: 110,
    draft: false,
    category: 'Accessories',
    gender: 'Unisex',
    sku: 'SST-SMC-05',
    image: PRODUCT_ASSETS['prod-5'],
    photos: [PRODUCT_ASSETS['prod-5']],
    description:
      'Diagonal striped woven uniform tie with reinforced loop and tipping.',
    sizes: [{ size: 0, stock: 110 }],
  },
  {
    id: 'prod-6',
    name: 'House PE T-Shirt (Red)',
    schoolId: 'greenfield-public-school',
    school: 'Greenfield Public School',
    classes: 'Class 3 to Class 8',
    price: 320,
    mrp: 350,
    stock: 0,
    draft: true,
    category: 'Shirts and tops',
    gender: 'Unisex',
    sku: 'HPE-GFS-06',
    image: PRODUCT_ASSETS['prod-6'],
    photos: [PRODUCT_ASSETS['prod-6']],
    description:
      'Sports house cotton polo t-shirt with contrast white collar tipping.',
    sizes: [{ size: 28, stock: 0 }],
  },
  {
    id: 'prod-7',
    name: 'Classic School Belt',
    schoolId: 'greenfield-public-school',
    school: 'Greenfield Public School',
    classes: 'Class 1 to Class 8',
    price: 120,
    mrp: 150,
    stock: 85,
    draft: false,
    category: 'Accessories',
    gender: 'Unisex',
    sku: 'CSB-GFS-07',
    image: PRODUCT_ASSETS['prod-7'],
    photos: [PRODUCT_ASSETS['prod-7']],
    description: 'Adjustable woven belt with school crest metal buckle.',
    sizes: [{ size: 0, stock: 85 }],
  },
  {
    id: 'prod-8',
    name: 'Black School Oxford Shoes',
    schoolId: 'st-marys-convent',
    school: "St. Mary's Convent",
    classes: 'Class 1 to Class 12',
    price: 890,
    mrp: 999,
    stock: 4,
    draft: false,
    category: 'Footwear',
    gender: 'Unisex',
    sku: 'BSO-SMC-08',
    image: PRODUCT_ASSETS['prod-8'],
    photos: [PRODUCT_ASSETS['prod-8']],
    description: 'Formal synthetic leather uniform shoes with anti-skid rubber sole.',
    sizes: [
      { size: 5, stock: 2 },
      { size: 6, stock: 2 },
    ],
  },
  {
    id: 'prod-9',
    name: 'Formal School Blazer',
    schoolId: 'dav-public-senior-school',
    school: 'DAV Public Senior School',
    classes: 'Class 9 to Class 12',
    price: 1650,
    mrp: 1899,
    stock: 0,
    draft: false,
    category: 'Winter',
    gender: 'Unisex',
    sku: 'FSB-DAV-09',
    image: PRODUCT_ASSETS['prod-9'],
    photos: [PRODUCT_ASSETS['prod-9']],
    description: 'Navy blue tailored wool-blend blazer with embroidered school crest.',
    sizes: [{ size: 34, stock: 0 }],
  },
  {
    id: 'prod-10',
    name: 'Sports Track Pants',
    schoolId: 'dav-public-senior-school',
    school: 'DAV Public Senior School',
    classes: 'Class 6 to Class 12',
    price: 520,
    mrp: 580,
    stock: 38,
    draft: false,
    category: 'Bottoms',
    gender: 'Unisex',
    sku: 'STP-DAV-10',
    image: PRODUCT_ASSETS['prod-10'],
    photos: [PRODUCT_ASSETS['prod-10']],
    description: 'Navy micro-poly track pants with elastic waist and side piping.',
    sizes: [{ size: 30, stock: 38 }],
  },
  {
    id: 'prod-11',
    name: 'Cotton School Socks (Pack of 3)',
    schoolId: 'st-marys-convent',
    school: "St. Mary's Convent",
    classes: 'All Classes',
    price: 180,
    mrp: 210,
    stock: 120,
    draft: false,
    category: 'Accessories',
    gender: 'Unisex',
    sku: 'CSS-SMC-11',
    image: PRODUCT_ASSETS['prod-11'],
    photos: [PRODUCT_ASSETS['prod-11']],
    description: 'White ankle-length cotton socks with school stripe band.',
    sizes: [{ size: 0, stock: 120 }],
  },
  {
    id: 'prod-12',
    name: 'House PE T-Shirt (Blue)',
    schoolId: 'greenfield-public-school',
    school: 'Greenfield Public School',
    classes: 'Class 3 to Class 8',
    price: 320,
    mrp: 350,
    stock: 0,
    draft: true,
    category: 'Shirts and tops',
    gender: 'Unisex',
    sku: 'HPE-GFS-12',
    image: PRODUCT_ASSETS['prod-12'],
    photos: [PRODUCT_ASSETS['prod-12']],
    description: 'Royal blue breathable pique cotton house sports jersey.',
    sizes: [{ size: 28, stock: 0 }],
  },
];

let productsMemory = [...INITIAL_PRODUCTS];

export const productsRepository = {
  async list() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...productsMemory];
  },

  async get(id) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const product = productsMemory.find((p) => p.id === id);
    if (!product) throw new Error(`Product with id ${id} not found`);
    return { ...product };
  },

  async create(data) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...data,
    };
    productsMemory = [newProduct, ...productsMemory];
    return { ...newProduct };
  },

  async update(id, data) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const index = productsMemory.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Product with id ${id} not found`);
    productsMemory[index] = { ...productsMemory[index], ...data };
    return { ...productsMemory[index] };
  },

  async delete(id) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    productsMemory = productsMemory.filter((p) => p.id !== id);
    return true;
  },
};
