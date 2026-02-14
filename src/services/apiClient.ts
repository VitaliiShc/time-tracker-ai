/**
 * Typed generic request function for the app API.
 * Uses fetch, parses JSON, and handles the backend envelope.
 */

/** Backend success envelope */
interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
}

/** Backend error envelope */
interface ApiErrorEnvelope {
  success: false;
  error: string;
  code?: string;
}

/** Parsed response body from the API */
type ApiEnvelope<T> = ApiSuccessEnvelope<T> | ApiErrorEnvelope;

/**
 * Performs a typed request to the app API.
 * Expects JSON envelope: { success: true, data } or { success: false, error, code? }.
 * Throws on non-ok response or when success is false.
 *
 * @param input - Request URL or Request object
 * @param init - Optional fetch init (method, body, etc.)
 * @returns Promise resolving to the response data when success is true
 * @throws Error with message and optional code when success is false
 * @throws Error when response is not ok (e.g. 404, 500)
 */
export async function apiRequest<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const mergedInit: RequestInit = {
    ...init,
    headers: { ...defaultHeaders, ...init?.headers },
  };

  const response = await fetch(input, mergedInit);
  const json = await response.json().catch(() => ({})) as ApiEnvelope<T>;

  if (!response.ok) {
    throw new Error(json && 'error' in json ? json.error : 'Request failed');
  }

  if (json.success === false) {
    const err = new Error(json.error) as Error & { code?: string };
    if (json.code !== undefined) {
      err.code = json.code;
    }
    throw err;
  }

  return json.data;
}
