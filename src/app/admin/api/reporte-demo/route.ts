import { NextResponse } from "next/server";
import { getSuvogaData } from "@/lib/crm-data/get-suvoga-data";
import { buildDemoRecordsReport } from "@/lib/crm-data/demo-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getSuvogaData();
    const posiblesRegistrosPrueba = buildDemoRecordsReport(data);
    return NextResponse.json(
      {
        ok: true,
        total: posiblesRegistrosPrueba.length,
        posiblesRegistrosPrueba,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    console.error("[admin] No se pudo generar el reporte de prueba.");
    return NextResponse.json(
      { error: "No se pudo generar el reporte." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
