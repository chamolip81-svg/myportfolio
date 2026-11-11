import test from "node:test";
import assert from "node:assert/strict";
import {
  validateContactSubmission,
  checkRateLimit,
  checkRateLimitDistributed,
  sanitizeText,
} from "./contact.ts";

test("sanitizeText strips dangerous HTML characters", () => {
  const dirty = "<script>alert('xss')</script>Hello World! <img src=x onerror=alert(1)>";
  const clean = sanitizeText(dirty);
  assert.equal(clean.includes("<"), false);
  assert.equal(clean.includes(">"), false);
  assert.ok(clean.includes("Hello World!"));
});

test("validateContactSubmission succeeds for valid human input", () => {
  const now = Date.now();
  const result = validateContactSubmission(
    {
      name: "Alice Recruiter",
      email: "alice@techcompany.com",
      subject: "Frontend Engineering Opportunity",
      message: "Hi Priyanshu, we loved your Network Quest simulator and would like to interview you.",
      _formLoadedAt: now - 10000, // 10 seconds ago
    },
    now
  );

  assert.equal(result.isValid, true);
  assert.equal(result.isBot, false);
  assert.equal(Object.keys(result.errors).length, 0);
  assert.equal(result.sanitized?.name, "Alice Recruiter");
  assert.equal(result.sanitized?.email, "alice@techcompany.com");
});

test("validateContactSubmission triggers honeypot bot trap", () => {
  const result = validateContactSubmission({
    name: "Spam Bot",
    email: "bot@spammer.org",
    message: "Buy cheap crypto links today!",
    _hp_company: "SpamCorp LLC",
  });

  assert.equal(result.isValid, false);
  assert.equal(result.isBot, true);
  assert.ok(result.errors.bot);
});

test("validateContactSubmission detects rapid automated submissions (< 2s)", () => {
  const now = Date.now();
  const result = validateContactSubmission(
    {
      name: "Lightning Fast Bot",
      email: "bot@fast.com",
      message: "Automated instant submission test.",
      _formLoadedAt: now - 500, // 500ms elapsed
    },
    now
  );

  assert.equal(result.isValid, false);
  assert.equal(result.isBot, true);
});

test("validateContactSubmission rejects short names, invalid emails, and short messages", () => {
  const result = validateContactSubmission({
    name: "A",
    email: "not-an-email",
    message: "Too short",
  });

  assert.equal(result.isValid, false);
  assert.equal(result.isBot, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test("checkRateLimit allows up to maxRequests and blocks excess", () => {
  const testIp = `192.0.2.${Math.floor(Math.random() * 250) + 1}`;

  // First 3 requests should be allowed
  const r1 = checkRateLimit(testIp, 3, 60000);
  assert.equal(r1.allowed, true);
  assert.equal(r1.remaining, 2);

  const r2 = checkRateLimit(testIp, 3, 60000);
  assert.equal(r2.allowed, true);
  assert.equal(r2.remaining, 1);

  const r3 = checkRateLimit(testIp, 3, 60000);
  assert.equal(r3.allowed, true);
  assert.equal(r3.remaining, 0);

  // 4th request must be blocked
  const r4 = checkRateLimit(testIp, 3, 60000);
  assert.equal(r4.allowed, false);
  assert.equal(r4.remaining, 0);
  assert.ok(r4.resetInSec > 0);
});

test("checkRateLimitDistributed uses memory-fallback when Upstash credentials are unset", async () => {
  const testIp = `198.51.100.${Math.floor(Math.random() * 250) + 1}`;
  const result = await checkRateLimitDistributed(testIp, 5, 60000);
  assert.equal(result.allowed, true);
  assert.equal(result.provider, "memory-fallback");
  assert.equal(result.remaining, 4);
});

