'use client'

import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Confetti pieces scattered around the checkmark icon
const CONFETTI = [
  { color: '#7C3AED', top: '10%',  left: '18%',  rotate: 45,  w: 6,  h: 6,  rounded: false },
  { color: '#EC4899', top: '0%',   left: '42%',  rotate: 20,  w: 4,  h: 10, rounded: false },
  { color: '#3B82F6', top: '8%',   left: '68%',  rotate: -30, w: 5,  h: 5,  rounded: false },
  { color: '#D4AF37', top: '22%',  left: '80%',  rotate: 60,  w: 4,  h: 4,  rounded: true  },
  { color: '#7C3AED', top: '55%',  left: '88%',  rotate: 15,  w: 4,  h: 10, rounded: false },
  { color: '#EC4899', top: '72%',  left: '72%',  rotate: -45, w: 5,  h: 5,  rounded: true  },
  { color: '#3B82F6', top: '78%',  left: '28%',  rotate: 30,  w: 4,  h: 9,  rounded: false },
  { color: '#D4AF37', top: '68%',  left: '12%',  rotate: -20, w: 5,  h: 5,  rounded: false },
  { color: '#7C3AED', top: '38%',  left: '4%',   rotate: 50,  w: 4,  h: 4,  rounded: true  },
  { color: '#EC4899', top: '15%',  left: '88%',  rotate: -60, w: 3,  h: 8,  rounded: false },
  { color: '#3B82F6', top: '82%',  left: '50%',  rotate: 25,  w: 4,  h: 4,  rounded: true  },
  { color: '#D4AF37', top: '5%',   left: '25%',  rotate: -15, w: 3,  h: 9,  rounded: false },
]

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="flex flex-col items-center text-center">

        {/* Confetti + icon area */}
        <div className="relative mb-6 flex h-32 w-56 items-center justify-center">
          {/* Confetti pieces */}
          {CONFETTI.map((piece, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute"
              style={{
                top: piece.top,
                left: piece.left,
                width: piece.w,
                height: piece.h,
                backgroundColor: piece.color,
                borderRadius: piece.rounded ? '50%' : '2px',
                transform: `rotate(${piece.rotate}deg)`,
                opacity: 0.85,
              }}
            />
          ))}

          {/* Green gradient checkmark circle */}
          <div
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg"
            style={{
              background: 'linear-gradient(160deg, #4ade80 0%, #16a34a 45%, #006B3F 100%)',
            }}
          >
            <Check className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Copy */}
        <h1 className="text-2xl font-bold text-npf-blue sm:text-3xl">
          You&apos;re all set!
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-base">
          Your account is ready. Start your application whenever you&apos;re ready.
        </p>

        {/* CTA */}
        <Button
          className="mt-8 h-12 w-full max-w-[340px] rounded-full bg-npf-blue text-white hover:bg-npf-blue/90"
          onClick={() => router.replace('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
