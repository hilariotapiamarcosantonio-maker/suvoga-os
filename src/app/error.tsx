"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FDFBF7] px-4 text-[#0D3B22]">
      <div className="flex flex-col items-center space-y-2">
        <h2 className="suvoga-serif text-3xl font-semibold text-[#0D3B22]">
          No pudimos cargar SuVoGa Academia
        </h2>
        <p className="max-w-md text-center text-sm leading-6 text-[#4E6658]">
          Revisa la conexión con la base de datos y vuelve a intentarlo.
        </p>
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-[#0D3B22] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#145332]"
      >
        Reintentar
      </button>
    </div>
  );
}
