import Link from "next/link";

const DOWNLOAD_URL =
  "https://storage.googleapis.com/lostandfound-d0629.firebasestorage.app/admin/windows/restrova-admin-setup.exe";

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-[#F8E9D0] to-[#FFE5D9]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-[#FF6B6B]/20 blur-3xl animate-float" />
          <div
            className="absolute top-40 right-20 h-96 w-96 rounded-full bg-[#F4A261]/20 blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-[#8FBC8F]/15 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#F4A261]/30 bg-white/95 px-6 py-3 text-sm font-semibold text-[#FF6B6B] shadow-lg shadow-[#F4A261]/20 backdrop-blur">
                Restrova Admin App
              </span>

              <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
                Download the{" "}
                <span className="bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] bg-clip-text text-transparent">
                  Restrova Admin App
                </span>{" "}
                for Windows
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Install the Restrova admin application to receive orders,
                manage preparation status, and operate your restaurant ordering
                system from one desktop workspace.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={DOWNLOAD_URL}
                  download
                  className="group inline-flex h-16 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-10 text-lg font-bold text-white shadow-2xl shadow-[#FF6B6B]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#F4A261]/40"
                >
                  <svg
                    className="mr-3 h-6 w-6 transition-transform group-hover:translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4"
                    />
                  </svg>
                  Download for Windows
                </a>

                <Link
                  href="/"
                  className="inline-flex h-16 items-center justify-center rounded-full border-2 border-[#FF6B6B] bg-white px-10 text-lg font-bold text-[#FF6B6B] shadow-lg transition-all hover:scale-105 hover:bg-[#FF6B6B] hover:text-white hover:shadow-xl"
                >
                  Back to Home
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full border border-[#F4A261]/30 bg-white/90 px-4 py-2 shadow-sm">
                  Windows installer
                </span>
                <span className="rounded-full border border-[#F4A261]/30 bg-white/90 px-4 py-2 shadow-sm">
                  Restaurant admin dashboard
                </span>
                <span className="rounded-full border border-[#F4A261]/30 bg-white/90 px-4 py-2 shadow-sm">
                  Fast setup
                </span>
              </div>
            </div>

            <div
              className="relative animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] opacity-20 blur-2xl" />

              <div className="rounded-3xl border border-[#F4A261]/30 bg-white/95 p-8 shadow-2xl backdrop-blur">
                <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-[#FFF5E6] p-8">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#FF6B6B] to-[#F4A261] text-white shadow-xl">
                    <svg
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-8 0h10m-12 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div className="mt-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">
                      Restrova Admin Setup
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Download and install the desktop app to manage incoming
                      orders, update statuses, and support daily restaurant
                      operations.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4">
                    {[
                      "Receive and manage online orders",
                      "Update preparation and order status",
                      "Built for restaurant teams",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-[#F4A261]/20 bg-white p-4 shadow-sm"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F8E9D0] font-bold text-[#F4A261]">
                          ✓
                        </span>
                        <span className="text-sm font-medium text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={DOWNLOAD_URL}
                    download
                    className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-full bg-slate-900 px-8 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-slate-800"
                  >
                    Download Installer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#F4A261]/20 bg-white/70 py-8 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-600">
          Having trouble installing? Contact the Restrova support team for
          assistance.
        </div>
      </section>
    </main>
  );
}