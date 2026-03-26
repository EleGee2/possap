'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OnboardingShell } from '@/components/onboarding/OnboardingShell'
import { useRegistration } from '@/lib/registration-context'
import { cn } from '@/lib/utils'

const STEPS = [
  { label: 'Personal Information' },
  { label: 'Password Creation' },
  { label: 'Email verification' },
]

const OTP_LENGTH = 6

export default function EmailVerifyPage() {
  const router = useRouter()
  const { state } = useRegistration()
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [resent, setResent] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const isComplete = otp.every(d => d !== '')

  function handleChange(index: number, value: string) {
    // Only allow single digit
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)

    // Auto-advance to next box
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      if (otp[index] !== '') {
        // Clear current box
        const next = [...otp]
        next[index] = ''
        setOtp(next)
      } else if (index > 0) {
        // Move to previous box
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((char, i) => { next[i] = char })
    setOtp(next)
    // Focus the last filled box or last box
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    inputRefs.current[focusIndex]?.focus()
  }

  function handleResend() {
    setResent(true)
    setOtp(Array(OTP_LENGTH).fill(''))
    inputRefs.current[0]?.focus()
    setTimeout(() => setResent(false), 3000)
  }

  function handleContinue() {
    // Mock: any complete 6-digit code succeeds
    router.push('/register/individual/success')
  }

  return (
    <OnboardingShell
      title="Verify your email address"
      breadcrumb="Sign up / Create your personal account / Verify your email address"
      progress={84}
      currentStep={3}
      steps={STEPS}
    >
      <h2 className="text-2xl font-bold text-npf-blue">Confirm your email address</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        We&apos;ve sent a 6-digit code to{' '}
        {state.email ? (
          <span className="font-medium text-[#1A1A2E]">{state.email}</span>
        ) : (
          'your email'
        )}
        . Enter it below to verify your account.
      </p>

      <div className="mt-8">
        {/* Constrain everything to the natural width of the OTP row */}
        <div className="w-fit space-y-6">
        {/* OTP boxes */}
        <div className="flex gap-2 sm:gap-3" role="group" aria-label="One-time password input">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={e => e.target.select()}
              aria-label={`Digit ${index + 1}`}
              className={cn(
                'h-[60px] w-[60px] shrink-0 rounded-2xl border bg-white sm:h-[72px] sm:w-[72px]',
                'text-center text-2xl font-normal text-[#1A1A2E]',
                'caret-transparent transition-colors duration-150',
                'focus:border-npf-blue focus:outline-none focus:ring-2 focus:ring-npf-blue/20',
                digit ? 'border-gray-400' : 'border-gray-300',
              )}
            />
          ))}
        </div>

        {/* Resend */}
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive a code?{' '}
          {resent ? (
            <span className="font-semibold text-npf-green">Code resent!</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="border-0 font-semibold text-[#1A1A2E] hover:text-npf-blue hover:underline"
            >
              Resend
            </button>
          )}
        </p>

        {/* Continue + Back — matches the width of the OTP row above */}
        <div className="flex w-full items-center gap-3 pt-2">
          <Button
            className={cn(
              'flex-1 rounded-full transition-colors duration-200',
              isComplete
                ? 'bg-npf-blue text-white hover:bg-npf-blue/90'
                : 'cursor-not-allowed bg-gray-200 text-gray-400 opacity-100',
            )}
            disabled={!isComplete}
            onClick={handleContinue}
          >
            Continue
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0 rounded-full"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        </div>{/* end w-fit wrapper */}
      </div>
    </OnboardingShell>
  )
}
