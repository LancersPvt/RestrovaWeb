import type { Metadata } from "next";
import RestrovaScheduleDemo from "@/components/RestrovaScheduleDemo";
export const metadata: Metadata = {
  title: "Request a Restrova Demo",
  robots: { index: false, follow: false },
};
export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-[#f9f8f6] px-4 py-12 sm:py-20">
      <RestrovaScheduleDemo />
    </main>
  );
}
