// src/components/Footer.tsx
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-labelledby="site-footer">
      {/* thin gradient bar like the screenshot */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400/70 via-sky-400/70 to-purple-400/70" />

      <div className="bg-[#111a27] text-gray-300">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center">
          <h2
            id="site-footer"
            className="text-lg font-semibold tracking-wide text-gray-100"
          >
            Farmculture
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Revolutionizing Agriculture with AI Technology &amp; Blockchain Traceability
          </p>

          {/* “Powered by” + “Technologies” rows */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/5 px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Powered by
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Google AI
                </span>
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Firebase
                </span>
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Vertex AI
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Technologies
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Machine Learning
                </span>
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Blockchain
                </span>
              </div>
            </div>
          </div>

          {/* divider */}
          <hr className="my-8 border-white/10" />

          <p className="text-xs text-gray-400">
            © 2025 Farmculture Helping farmers with small contribution towards society.
          </p>
        </div>
      </div>
    </footer>
  );
}
