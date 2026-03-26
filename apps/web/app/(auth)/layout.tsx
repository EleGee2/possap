import { NigerianFlagStrip } from '@/components/auth/NigerianFlagStrip'
import { AuthLogo } from '@/components/auth/AuthLogo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* ── Background layer ─────────────────────────────────────────
          Gradient placeholder simulating a faded cityscape.
          Replace with:
            <Image src="/images/auth-bg.jpg" alt="" fill className="object-cover opacity-25 -z-10" />
          when the photography asset is provided.
      ──────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,48,135,0.08) 0%, rgba(248,249,250,0.95) 45%, rgba(0,107,63,0.06) 100%), #e8edf5',
        }}
      />

      {/* ── Left Nigerian flag color strip (desktop only) ─────── */}
      <NigerianFlagStrip />

      {/* ── Main content column ──────────────────────────────── */}
      <div className="flex min-h-screen flex-col md:pl-[72px]">

        {/* Top-left breadcrumb */}
        <div className="px-8 pt-6 text-sm text-muted-foreground">
          Sign up
        </div>

        {/* Logos + tagline */}
        <div className="flex justify-center pt-8 pb-4">
          <AuthLogo />
        </div>

        {/* Card area */}
        <main className="flex flex-1 items-start justify-center px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-xs text-muted-foreground">
          © POSSAP 2026&nbsp;&nbsp;•&nbsp;&nbsp;
          <a href="/help" className="hover:underline">Help Center</a>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </footer>
      </div>
    </div>
  )
}
