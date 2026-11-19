import { LOW_STOCK_THRESHOLD } from '../constants';

export { LOW_STOCK_THRESHOLD };

/**
 * Formats an amount into Indian Rupee representation (e.g. ₹42,860)
 * @param {number} amount
 * @returns {string}
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `₹${formatted}`;
}

/**
 * Singular or plural helper
 * @param {number} count
 * @param {string} singular
 * @param {string} pluralForm
 * @returns {string}
 */
export function plural(count, singular, pluralForm) {
  return count === 1 ? singular : pluralForm;
}
