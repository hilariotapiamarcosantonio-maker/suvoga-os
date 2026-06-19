import type { EmailMessage, EmailSendResult } from "./email-types";

export interface EmailProvider {
  send(message: EmailMessage): Promise<EmailSendResult>;
}

type EmailProviderConfig = {
  provider: string;
  apiKey: string;
  from: string;
};

function getEmailProviderConfig(): EmailProviderConfig {
  return {
    provider: process.env.EMAIL_PROVIDER?.trim().toLowerCase() || "disabled",
    apiKey: process.env.EMAIL_API_KEY?.trim() || "",
    from: process.env.EMAIL_FROM?.trim() || "",
  };
}

class DisabledEmailProvider implements EmailProvider {
  async send(): Promise<EmailSendResult> {
    return {
      status: "skipped",
      provider: "disabled",
      reason: "Email provider is not configured.",
    };
  }
}

class ResendEmailProvider implements EmailProvider {
  constructor(private readonly config: EmailProviderConfig) {}

  async send(message: EmailMessage): Promise<EmailSendResult> {
    if (!this.config.apiKey || !this.config.from) {
      return {
        status: "skipped",
        provider: "resend",
        reason: "Missing EMAIL_API_KEY or EMAIL_FROM.",
      };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: message.from,
          to: message.to.map((item) => item.email),
          reply_to: message.replyTo,
          subject: message.subject,
          text: message.text,
          html: message.html,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { id?: string; message?: string } | null;
      if (!response.ok) {
        return {
          status: "failed",
          provider: "resend",
          reason: payload?.message || `Resend responded with ${response.status}.`,
        };
      }

      return {
        status: "sent",
        provider: "resend",
        id: payload?.id,
      };
    } catch (error) {
      return {
        status: "failed",
        provider: "resend",
        reason: error instanceof Error ? error.message : "Unknown email send error.",
      };
    }
  }
}

export function createEmailProvider(): { provider: EmailProvider; from: string } {
  const config = getEmailProviderConfig();

  if (config.provider === "resend") {
    return {
      provider: new ResendEmailProvider(config),
      from: config.from,
    };
  }

  return {
    provider: new DisabledEmailProvider(),
    from: config.from,
  };
}
