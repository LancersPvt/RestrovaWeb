import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
export const metadata: Metadata = {
  title: "Thank You | Restrova",
  robots: { index: false, follow: false },
};
export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f9f8f6] px-4">
      <div className="w-full max-w-xl rounded-2xl border border-emerald-200 bg-white p-9 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
        <h1 className="mt-5 text-2xl font-black text-[#171816]">Thank you! Your form has been submitted successfully.</h1>
      </div>
    </main>
  );
}
