import Envelope from "./components/Envelope";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF5ED] px-4">
      <h1 className="mb-8 text-center font-serif text-3xl text-[#8B7355]">
        Wedding Invitation
      </h1>

      <Envelope />

      <p className="mt-6 text-center text-sm text-[#8B7355]">
        Click the envelope to open your invitation
      </p>
    </main>
  );
}
