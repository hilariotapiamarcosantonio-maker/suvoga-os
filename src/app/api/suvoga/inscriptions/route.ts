import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function legacyRouteGone() {
  return NextResponse.json(
    {
      error:
        "Esta ruta de inscripciones fue retirada. Usa /api/suvoga/inquiries.",
    },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

export async function GET() {
  return legacyRouteGone();
}

export async function POST() {
  return legacyRouteGone();
}
