/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Health check response
 */
export interface HealthResponse {
  status: string;
  service: string;
}

/**
 * Encrypt API request (FormData)
 */
export interface EncryptRequest {
  image: File;
  message: string;
  key: string;
}

/**
 * Decrypt API request (FormData)
 */
export interface DecryptRequest {
  image: File;
  key: string;
}

/**
 * Decrypt API response
 */
export interface DecryptResponse {
  status: string;
  message: string;
}

/**
 * Error response format
 */
export interface ErrorResponse {
  detail: string;
}
