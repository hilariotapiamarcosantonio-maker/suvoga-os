export default function AdminLoading() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#FDFBF7] px-6 text-[#0D3B22]">
      <div className="w-full max-w-sm rounded-3xl border border-[#D4AF37]/30 bg-white p-8 text-center shadow-sm shadow-[#0D3B22]/5">
        <div className="mx-auto h-10 w-10 animate-pulse rounded-2xl bg-[#0D3B22]" aria-hidden="true" />
        <p className="suvoga-serif mt-5 text-2xl font-semibold">Cargando panel SuVoGa…</p>
        <p className="mt-2 text-sm text-[#4E6658]">Conectando con Google Sheets</p>
      </div>
    </main>
  );
}
