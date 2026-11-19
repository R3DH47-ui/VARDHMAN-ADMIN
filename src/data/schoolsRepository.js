/**
 * @typedef {Object} School
 * @property {string} id
 * @property {string} name
 * @property {string} shortName
 * @property {string} classRange
 * @property {string[]} classes
 * @property {number} productCount
 * @property {'CBSE' | 'ICSE' | 'State' | 'Cambridge' | 'IB'} affiliationBoard
 * @property {string} [affiliationCode]
 * @property {string} address
 * @property {boolean} showInCustomerApp
 * @property {string} [logoUri]
 */

const INITIAL_SCHOOLS = [
  {
    id: 'greenfield-public-school',
    name: 'Greenfield Public School',
    shortName: 'Greenfield Public',
    classRange: 'Nursery to Class 8',
    classes: [
      'Nursery', 'LKG', 'UKG',
      'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
      'Class 6', 'Class 7', 'Class 8',
    ],
    productCount: 64,
    affiliationBoard: 'CBSE',
    affiliationCode: 'CBSE/NW-104',
    address: 'Plot 14, Sector 6, Dwarka, New Delhi - 110075',
    showInCustomerApp: true,
  },
  {
    id: 'st-marys-convent',
    name: "St. Mary's Convent",
    shortName: "St. Mary's Convent",
    classRange: 'Nursery to Class 12',
    classes: [
      'Nursery', 'LKG', 'UKG',
      'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
      'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
      'Class 11', 'Class 12',
    ],
    productCount: 78,
    affiliationBoard: 'CBSE',
    affiliationCode: 'CBSE/DL-208',
    address: 'Civil Lines, Near Ridge Road, New Delhi - 110054',
    showInCustomerApp: true,
  },
  {
    id: 'dav-public-senior-school',
    name: 'DAV Public Senior School',
    shortName: 'DAV Public Senior',
    classRange: 'Class 1 to Class 12',
    classes: [
      'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
      'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
      'Class 11', 'Class 12',
    ],
    productCount: 44,
    affiliationBoard: 'CBSE',
    affiliationCode: 'CBSE/NW-291',
    address: 'Sector 14, Rohini, New Delhi - 110085',
    showInCustomerApp: true,
  },
];

let schoolsMemory = [...INITIAL_SCHOOLS];

export const schoolsRepository = {
  async list() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...schoolsMemory];
  },

  async get(id) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const school = schoolsMemory.find((s) => s.id === id);
    if (!school) throw new Error(`School with id ${id} not found`);
    return { ...school };
  },

  async create(data) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const newSchool = {
      id: `school-${Date.now()}`,
      productCount: 0,
      ...data,
    };
    schoolsMemory = [newSchool, ...schoolsMemory];
    return { ...newSchool };
  },

  async update(id, data) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const index = schoolsMemory.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`School with id ${id} not found`);
    schoolsMemory[index] = { ...schoolsMemory[index], ...data };
    return { ...schoolsMemory[index] };
  },

  async delete(id) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    schoolsMemory = schoolsMemory.filter((s) => s.id !== id);
    return true;
  },
};
