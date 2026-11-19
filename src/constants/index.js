/**
 * Constants & Enums for Vardhman Admin Portal
 */

export const ORDER_STATUS = Object.freeze({
  NEW: 'New',
  PACKED: 'Packed',
  DELIVERED: 'Delivered',
});

export const PRODUCT_STATUS = Object.freeze({
  PUBLISHED: 'Published',
  LOW_STOCK: 'Low stock',
  OUT_OF_STOCK: 'Out of stock',
  DRAFT: 'Draft',
});

export const PRODUCT_CATEGORIES = Object.freeze([
  'All',
  'Shirts and tops',
  'Bottoms',
  'Winter',
  'Accessories',
  'Footwear',
]);

export const GENDERS = Object.freeze(['Boys', 'Girls', 'Unisex']);

export const AFFILIATION_BOARDS = Object.freeze([
  'CBSE (Central Board of Secondary Education)',
  'ICSE / ISC (Council for the Indian School Cert.)',
  'State Education Board',
  'Cambridge Assessment International (CAIE)',
  'International Baccalaureate (IB)',
]);

export const LOW_STOCK_THRESHOLD = 5;
