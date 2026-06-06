const SECRET = process.env.JWT_SECRET || 'wae-cms-super-secret-key-1029384756';
const encoder = new TextEncoder();

export interface SessionPayload {
  email: string;
  role: string;
  exp: number;
}

// Helper to base64url encode
function base64url(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Helper to decode base64url
function base64urlDecode(str: string): string {
  let mainStr = str.replace(/-/g, '+').replace(/_/g, '/');
  while (mainStr.length % 4) {
    mainStr += '=';
  }
  return atob(mainStr);
}

// Import key for HMAC signing
async function getCryptoKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(SECRET),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign', 'verify']
  );
}

/**
 * Creates a signed session token using native Web Crypto HMAC-SHA256
 */
export async function createSessionToken(email: string, role: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: SessionPayload = {
    email,
    role,
    exp: Date.now() + 7 * 24 * 3600 * 1000 // 7 days
  };

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;

  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${data}.${signatureB64}`;
}

/**
 * Verifies a session token using native Web Crypto HMAC-SHA256
 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;
    const data = `${headerB64}.${payloadB64}`;

    // Verify signature
    const key = await getCryptoKey();
    const signatureBuffer = new Uint8Array(
      base64urlDecode(signatureB64)
        .split('')
        .map(c => c.charCodeAt(0))
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      encoder.encode(data)
    );

    if (!isValid) return null;

    // Verify expiration
    const payload: SessionPayload = JSON.parse(base64urlDecode(payloadB64));
    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}
