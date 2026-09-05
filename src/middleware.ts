import { NextRequest, NextResponse } from "next/server";
import { brandingConfig } from "@/config/branding.config";

function secureAdminResponse(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return response;
}

function unauthorized() {
  return secureAdminResponse(
    new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="${brandingConfig.productName}"`,
      },
    })
  );
}

export function middleware(request: NextRequest) {
  const configuredUser = process.env.CRM_BASIC_AUTH_USER;
  const configuredPassword = process.env.CRM_BASIC_AUTH_PASSWORD;

  if (!configuredUser || !configuredPassword) {
    return secureAdminResponse(
      new NextResponse("Admin authentication is not configured", {
        status: 503,
      })
    );
  }

  const header = request.headers.get("authorization");

  if (!header?.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const decoded = atob(header.slice("Basic ".length));
    const [user, ...passwordParts] = decoded.split(":");
    const password = passwordParts.join(":");

    if (user === configuredUser && password === configuredPassword) {
      return secureAdminResponse(NextResponse.next());
    }
  } catch {
    return unauthorized();
  }

  return unauthorized();
}

export const config = {
  matcher: ["/admin/:path*"],
};
