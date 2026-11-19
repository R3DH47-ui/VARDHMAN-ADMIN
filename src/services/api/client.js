/**
 * Centralized API client for all remote data calls.
 *
 * Features:
 * - Base URL from EXPO_PUBLIC_API_BASE_URL
 * - Request timeout (configurable)
 * - JSON handling
 * - Auth token injection from expo-secure-store
 * - Normalized error objects { code, message, status, details }
 * - 401 handler hook for session expiry
 * - Retry-safe GET helper
 */

import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL, REQUEST_TIMEOUT_MS } from '../../data/config';

const AUTH_TOKEN_KEY = 'vardhman_auth_token';

/** @type {(() => void) | null} */
let onSessionExpired = null;

/**
 * Register a callback that fires on 401 (session expired).
 * Typically wired from the auth store / provider.
 * @param {() => void} handler
 */
export function setSessionExpiredHandler(handler) {
  onSessionExpired = handler;
}

/**
 * @typedef {Object} ApiError
 * @property {string} code
 * @property {string} message
 * @property {number} status
 * @property {*} [details]
 */

/**
 * Build a normalized error from a failed response or exception.
 * @param {Response | null} response
 * @param {Error | null} error
 * @param {*} [body]
 * @returns {ApiError}
 */
function buildError(response, error, body) {
  if (error && error.name === 'AbortError') {
    return { code: 'TIMEOUT', message: 'Request timed out', status: 0, details: null };
  }
  if (error && !response) {
    return { code: 'NETWORK', message: error.message || 'Network error', status: 0, details: null };
  }
  const status = response?.status || 0;
  const serverMsg = body?.message || body?.error || response?.statusText || 'Unknown error';
  const serverCode = body?.code || `HTTP_${status}`;
  return { code: serverCode, message: serverMsg, status, details: body?.details || null };
}

/**
 * Read the stored auth token (if any).
 * @returns {Promise<string | null>}
 */
async function getAuthToken() {
  try {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  } catch (_) {
    return null;
  }
}

/**
 * Core request function.
 * @param {string} path - Relative path (e.g. /api/v1/products)
 * @param {Object} [options]
 * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} [options.method]
 * @param {Object} [options.body]
 * @param {Object} [options.headers]
 * @param {Object} [options.params] - URL query params
 * @param {number} [options.timeout]
 * @returns {Promise<*>}
 * @throws {ApiError}
 */
export async function request(path, options = {}) {
  const { method = 'GET', body, headers = {}, params, timeout = REQUEST_TIMEOUT_MS } = options;

  let url = `${API_BASE_URL}${path}`;
  if (params) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') qs.append(k, String(v));
    });
    const qsStr = qs.toString();
    if (qsStr) url += `?${qsStr}`;
  }

  const token = await getAuthToken();

  const reqHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };
  if (token) {
    reqHeaders.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  let response = null;
  let responseBody = null;

  try {
    response = await fetch(url, {
      method,
      headers: reqHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    throw buildError(null, err, null);
  }

  clearTimeout(timer);

  try {
    const text = await response.text();
    responseBody = text ? JSON.parse(text) : null;
  } catch (_) {
    responseBody = null;
  }

  if (response.status === 401) {
    if (onSessionExpired) onSessionExpired();
    throw buildError(response, null, responseBody);
  }

  if (!response.ok) {
    throw buildError(response, null, responseBody);
  }

  return responseBody;
}

/**
 * GET helper (retry-safe). Retries once on network error.
 * @param {string} path
 * @param {Object} [params] - Query parameters
 * @returns {Promise<*>}
 */
export async function get(path, params) {
  try {
    return await request(path, { method: 'GET', params });
  } catch (err) {
    if (err.code === 'NETWORK' || err.code === 'TIMEOUT') {
      return await request(path, { method: 'GET', params });
    }
    throw err;
  }
}

/**
 * POST helper.
 * @param {string} path
 * @param {Object} body
 * @returns {Promise<*>}
 */
export async function post(path, body) {
  return request(path, { method: 'POST', body });
}

/**
 * PUT helper.
 * @param {string} path
 * @param {Object} body
 * @returns {Promise<*>}
 */
export async function put(path, body) {
  return request(path, { method: 'PUT', body });
}

/**
 * PATCH helper.
 * @param {string} path
 * @param {Object} body
 * @returns {Promise<*>}
 */
export async function patch(path, body) {
  return request(path, { method: 'PATCH', body });
}

/**
 * DELETE helper.
 * @param {string} path
 * @returns {Promise<*>}
 */
export async function del(path) {
  return request(path, { method: 'DELETE' });
}
