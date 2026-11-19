/**
 * Data layer configuration.
 * This is the single switch that controls whether the app uses
 * mock data (default) or real backend APIs.
 */

const envFlag = process.env.EXPO_PUBLIC_USE_MOCK_DATA;

export const USE_MOCK_DATA = envFlag === undefined || envFlag === 'true' || envFlag === '1';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

export const REQUEST_TIMEOUT_MS = 15000;
