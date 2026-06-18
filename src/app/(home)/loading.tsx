export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FDFBF7]">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />
        <p className="text-sm font-medium uppercase tracking-widest text-[#0D3B22]">
          Preparando SuVoGa Academia...
        </p>
      </div>
    </div>
  );
}
