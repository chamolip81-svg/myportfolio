export interface ContactInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
  /** Honeypot field (must remain empty for human submissions) */
  _hp_company?: string;
  /** Timestamp when form was loaded in ms to detect instant bot submissions */
  _formLoadedAt?: number;
}

export interface ValidationResult {
  isValid: boolean;
  isBot: boolean;
  errors: Record<string, string>;
  sanitized?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, "") // Strip raw HTML angle brackets
    .trim();
}

export function validateContactSubmission(
  input: Partial<ContactInput>,
  currentTimeMs: number = Date.now()
): ValidationResult {
  const errors: Record<string, string> = {};

  // 1. Honeypot Trap
  if (input._hp_company && input._hp_company.trim().length > 0) {
    return {
      isValid: false,
      isBot: true,
      errors: { bot: "Automated submission detected via honeypot." },
    };
  }

  // 2. Fast-Submission Bot Trap (human typing takes > 2 seconds)
  if (input._formLoadedAt && typeof input._formLoadedAt === "number") {
    const elapsedMs = currentTimeMs - input._formLoadedAt;
    if (elapsedMs > 0 && elapsedMs < 2000) {
      return {
        isValid: false,
        isBot: true,
        errors: { bot: "Submission too fast for human interaction." },
      };
    }
  }

  // 3. Name Validation
  const rawName = (input.name || "").trim();
  if (!rawName || rawName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (rawName.length > 100) {
    errors.name = "Name must not exceed 100 characters.";
  }

  // 4. Email Validation
  const rawEmail = (input.email || "").trim().toLowerCase();
  if (!rawEmail || !EMAIL_REGEX.test(rawEmail) || rawEmail.length > 254) {
    errors.email = "Please provide a valid email address.";
  }

  // 5. Message Validation
  const rawMessage = (input.message || "").trim();
  if (!rawMessage || rawMessage.length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  } else if (rawMessage.length > 3000) {
    errors.message = "Message exceeds maximum length of 3000 characters.";
  }

  // 6. Subject Sanitization
  const rawSubject = (input.subject || "").trim();
  const safeSubject = rawSubject
    ? sanitizeText(rawSubject).slice(0, 150)
    : `Portfolio Message from ${sanitizeText(rawName)}`;

  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      isBot: false,
      errors,
    };
  }

  return {
    isValid: true,
    isBot: false,
    errors: {},
    sanitized: {
      name: sanitizeText(rawName),
      email: rawEmail,
      subject: safeSubject,
      message: sanitizeText(rawMessage),
    },
  };
}

/**
 * Persistent distributed rate limiter for Vercel serverless execution.
 * When UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in environment variables,
 * rate limiting is synchronized across all serverless regions and instances atomically.
 * If unset, it gracefully falls back to the in-process sliding window store.
 */
export async function checkRateLimitDistributed(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000
): Promise<{ allowed: boolean; remaining: number; resetInSec: number; provider: "upstash" | "memory-fallback" }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const windowSec = Math.ceil(windowMs / 1000);
  const cleanIp = (ip || "unknown").trim();
  const rateLimitKey = `portfolio:ratelimit:${cleanIp}`;

  if (upstashUrl && upstashToken) {
    try {
      const response = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", rateLimitKey],
          ["EXPIRE", rateLimitKey, windowSec],
        ]),
        cache: "no-store",
      });

      if (response.ok) {
        const results = await response.json();
        // Upstash pipeline returns [{ result: count }, { result: 1 }]
        const currentCount = Array.isArray(results) && results[0]?.result ? Number(results[0].result) : 1;

        if (currentCount > maxRequests) {
          return {
            allowed: false,
            remaining: 0,
            resetInSec: windowSec,
            provider: "upstash",
          };
        }

        return {
          allowed: true,
          remaining: Math.max(0, maxRequests - currentCount),
          resetInSec: windowSec,
          provider: "upstash",
        };
      }
    } catch (err) {
      console.warn("[RateLimiter] Upstash Redis request failed, using in-memory fallback:", err);
    }
  }

  // Graceful local fallback (process memory)
  const fallback = checkRateLimit(cleanIp, maxRequests, windowMs);
  return {
    ...fallback,
    provider: "memory-fallback",
  };
}

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const cleanIp = ip.trim() || "unknown";

  // Clean expired entries
  for (const [key, record] of rateLimitStore.entries()) {
    if (record.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  const existing = rateLimitStore.get(cleanIp);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(cleanIp, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSec: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - existing.count,
    resetInSec: Math.ceil((existing.resetAt - now) / 1000),
  };
}

