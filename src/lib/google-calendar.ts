import "server-only";

import { google } from "googleapis";
import {
  buildReservationCalendarEvent,
  type ReservationCalendarInput,
} from "./google-calendar-event";

const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events";

export type CalendarStatus = "created" | "skipped" | "failed";

export type CalendarResult = {
  status: CalendarStatus;
  eventId?: string;
};

function calendarErrorCode(error: unknown) {
  if (!error || typeof error !== "object") return "unknown";

  const code = "code" in error ? (error as { code?: unknown }).code : undefined;
  const status = "status" in error ? (error as { status?: unknown }).status : undefined;
  return String(code ?? status ?? "unknown").slice(0, 32);
}

export async function createReservationCalendarEvent(
  input: ReservationCalendarInput
): Promise<CalendarResult> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();
  if (!calendarId) return { status: "skipped" };

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) {
    console.warn("Google Calendar omitted: missing server configuration.");
    return { status: "failed" };
  }

  const event = buildReservationCalendarEvent(input);
  if (!event) {
    console.warn("Google Calendar omitted: invalid reservation date.");
    return { status: "failed" };
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: [CALENDAR_SCOPE],
    });
    const calendar = google.calendar({ version: "v3", auth });
    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
    });

    return {
      status: "created",
      eventId: response.data.id || undefined,
    };
  } catch (error) {
    console.warn("Google Calendar event creation failed.", {
      code: calendarErrorCode(error),
    });
    return { status: "failed" };
  }
}
