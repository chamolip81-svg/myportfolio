import { NextRequest, NextResponse } from "next/server";
import { validateContactSubmission, checkRateLimitDistributed } from "@/lib/contact";
import { siteConfig } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    // 1. Client IP Extraction
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    // 2. Distributed Serverless Rate Limiting (Upstash Redis with process memory fallback)
    const rateLimit = await checkRateLimitDistributed(clientIp, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many submissions from this connection. Please retry in ${rateLimit.resetInSec} seconds or email directly at ${siteConfig.email}.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSec.toString(),
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // 3. Parse JSON Body
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload provided." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // 4. Validate and Sanitize
    const validation = validateContactSubmission(body);

    // If honeypot caught a bot, return faux success so bot does not retry
    if (validation.isBot) {
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! Your message has been received.",
        },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (!validation.isValid || !validation.sanitized) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please correct the highlighted errors.",
          errors: validation.errors,
        },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const { name, email, subject, message } = validation.sanitized;

    // 5. Email Dispatch Engine
    // Option A: Resend API (Official free-tier serverless email provider, 100 emails/day free)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || siteConfig.email;
    const senderEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Priyanshu Chamoli <hello@send.priyanshuchamoli.dev>";

    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipientEmail],
          reply_to: email,
          subject: `[Portfolio Contact] ${subject}`,
          text: `New message from ${name} (${email}):\n\n${message}`,
        }),
      });

      const resendData = await resendResponse.json().catch(() => ({}));
      if (resendResponse.ok && resendData.id) {
        return NextResponse.json(
          {
            success: true,
            provider: "resend",
            message: `Thank you, ${name}! Your message has been delivered directly to ${recipientEmail}.`,
          },
          { status: 200, headers: { "Cache-Control": "no-store" } }
        );
      }
      console.warn("[Contact API] Resend dispatch failed, falling back to FormSubmit:", resendData);
    }

    // Option B: FormSubmit Gateway with verified origin headers
    const formSubmitUrl = `https://formsubmit.co/ajax/${recipientEmail}`;
    const dispatchResponse = await fetch(formSubmitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://www.priyanshuchamoli.dev",
        Referer: "https://www.priyanshuchamoli.dev/contact",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        _subject: subject,
        _template: "table",
        _captcha: "false",
      }),
    });

    const dispatchData = await dispatchResponse.json().catch(() => ({}));

    if (
      dispatchResponse.ok &&
      (dispatchData.success === "true" || dispatchData.success === true)
    ) {
      return NextResponse.json(
        {
          success: true,
          provider: "formsubmit",
          message: `Thank you, ${name}! Your message has been forwarded directly to ${recipientEmail}.`,
        },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Handle FormSubmit activation link requirement if newly configured
    if (
      typeof dispatchData.message === "string" &&
      dispatchData.message.toLowerCase().includes("activation")
    ) {
      return NextResponse.json(
        {
          success: true,
          status: "activation",
          message: `Your message was registered! FormSubmit sent an activation link to ${recipientEmail}. Click that link once to begin receiving messages.`,
        },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    // If delivery is NOT confirmed by any provider, do NOT claim success.
    return NextResponse.json(
      {
        success: false,
        message:
          "Email delivery service could not confirm dispatch. Please use the direct 1-click Gmail or Mail Client buttons below to ensure your message reaches Priyanshu.",
      },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error: unknown) {
    const errorMsg =
      error instanceof Error ? error.message : "Internal server dispatch error";
    console.error("[Contact API Error]:", errorMsg);

    return NextResponse.json(
      {
        success: false,
        message:
          "Could not deliver message via server gateway. Please use the direct 1-click email buttons below.",
      },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}

