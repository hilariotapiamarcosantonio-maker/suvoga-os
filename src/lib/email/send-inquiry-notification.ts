import { brandingConfig } from "@/config/branding.config";
import { contactConfig } from "@/config/contact.config";
import type { NormalizedInquiry, RegistrationResult } from "@/lib/inquiries/inquiry-types";
import { createEmailProvider } from "./email-provider";
import type { EmailSendResult, EmailWorkflowResult } from "./email-types";
import {
  buildInternalNotificationEmail,
  buildUserConfirmationEmail,
} from "./email-templates";

const skippedNoEmail: EmailSendResult = {
  status: "skipped",
  provider: "none",
  reason: "User did not provide email.",
};

export async function sendInquiryNotification(
  inquiry: NormalizedInquiry,
  registration: RegistrationResult
): Promise<EmailWorkflowResult> {
  const { provider, from } = createEmailProvider();
  const notificationTo = process.env.EMAIL_NOTIFICATION_TO?.trim() || contactConfig.email;
  const replyTo = inquiry.email || process.env.EMAIL_REPLY_TO?.trim() || contactConfig.email;
  const sender = from || "";
  const internal = buildInternalNotificationEmail(inquiry, registration);

  const notification = await provider.send({
    to: [{ email: notificationTo, name: brandingConfig.productName }],
    from: sender,
    replyTo,
    subject: internal.subject,
    text: internal.text,
    html: internal.html,
  });

  if (!inquiry.email) {
    return { notification, confirmation: skippedNoEmail };
  }

  const confirmationTemplate = buildUserConfirmationEmail(inquiry);
  const confirmation = await provider.send({
    to: [{ email: inquiry.email, name: inquiry.name }],
    from: sender,
    replyTo: process.env.EMAIL_REPLY_TO?.trim() || contactConfig.email,
    subject: confirmationTemplate.subject,
    text: confirmationTemplate.text,
    html: confirmationTemplate.html,
  });

  return { notification, confirmation };
}

export function summarizeEmailWorkflow(email: EmailWorkflowResult) {
  if (email.notification.status === "sent" && email.confirmation.status !== "failed") {
    return "Solicitud registrada y correo enviado.";
  }

  if (email.notification.status === "skipped") {
    return "Solicitud registrada. El correo queda pendiente de configurar proveedor y remitente.";
  }

  if (email.notification.status === "failed") {
    return "Solicitud registrada, pero el correo no pudo enviarse temporalmente.";
  }

  return "Solicitud registrada.";
}
