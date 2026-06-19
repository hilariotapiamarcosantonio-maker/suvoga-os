export type EmailSendStatus = "sent" | "skipped" | "failed";

export type EmailAddress = {
  email: string;
  name?: string;
};

export type EmailMessage = {
  to: EmailAddress[];
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

export type EmailSendResult = {
  status: EmailSendStatus;
  provider: string;
  id?: string;
  reason?: string;
};

export type EmailWorkflowResult = {
  notification: EmailSendResult;
  confirmation: EmailSendResult;
};
