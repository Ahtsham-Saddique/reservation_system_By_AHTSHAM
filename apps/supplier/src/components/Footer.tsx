import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="EcoTravel home"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-xl text-white shadow-lg shadow-brand/20 transition-transform duration-200 group-hover:-translate-y-0.5">
                <span aria-hidden="true">✦</span>
              </div>

              <span className="text-2xl font-bold tracking-tight text-white">
                Eco
                <span className="text-teal-300">Travel</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Discover better ways to travel. Find stays, journeys, and
              experiences designed to make planning your next trip simple.
            </p>

            {/* Brand highlights */}
            <div className="mt-7 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300">
                Trusted travel platform
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300">
                Secure reservations
              </div>
            </div>
          </div>

          {/* =================================================
              LINKS
          ================================================= */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-7">
            {/* Explore */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                Explore
              </h3>

              <ul className="mt-5 space-y-3.5">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Hotels
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Flights
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Buses
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Tours
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                Company
              </h3>

              <ul className="mt-5 space-y-3.5">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Our Mission
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                Support
              </h3>

              <ul className="mt-5 space-y-3.5">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                Legal
              </h3>

              <ul className="mt-5 space-y-3.5">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Terms
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Privacy
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}
        <div className="my-10 h-px bg-white/10" />

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-slate-500">
            © 2026 EcoTravel Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="flex h-2 w-2 rounded-full bg-teal-400" />
            <span>Travel better. Explore more.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}