'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Check, ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OnboardingShell } from '@/components/onboarding/OnboardingShell'
import { useRegistration } from '@/lib/registration-context'
import { cn } from '@/lib/utils'

const STEPS = [
  { label: 'Personal Information' },
  { label: 'Password Creation' },
  { label: 'Email verification' },
]

const PASSWORD_RULES = [
  { key: 'lowercase', label: 'A lowercase', test: (p: string) => /[a-z]/.test(p) },
  { key: 'uppercase', label: 'An uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { key: 'number', label: 'A number', test: (p: string) => /[0-9]/.test(p) },
  { key: 'special', label: 'A special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  { key: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
]

function ShieldIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden="true">
      {/* Outer blue shield */}
      <path
        d="M40 5 L68 17 L68 40 C68 57 54 70 40 75 C26 70 12 57 12 40 L12 17 Z"
        fill="#003087"
      />
      {/* Highlight edge */}
      <path
        d="M40 5 L68 17 L68 40 C68 57 54 70 40 75"
        fill="none"
        stroke="#1a4fa8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Inner green shield */}
      <path
        d="M40 15 L61 24 L61 40 C61 53 51 63 40 68 C29 63 19 53 19 40 L19 24 Z"
        fill="#4ADE80"
      />
      {/* Inner green shine */}
      <path
        d="M40 15 L61 24 L61 35"
        fill="none"
        stroke="#86efac"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* White checkmark */}
      <polyline
        points="28,40 37,49 53,31"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function SuccessModal({ onClose, onContinue }: { onClose: () => void; onContinue: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
    >
      <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white px-8 py-10 shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-[#1A1A2E]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Shield icon */}
        <div className="flex justify-center">
          <ShieldIcon />
        </div>

        {/* Text */}
        <h3 className="mt-5 text-center text-xl font-bold text-npf-blue">
          Password created successfully
        </h3>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Your password has been set. You can now securely access your account
        </p>

        {/* CTA */}
        <Button
          className="mt-7 h-12 w-full rounded-full bg-npf-blue text-white hover:bg-npf-blue/90"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-[#1A1A2E]">{children}</label>
  )
}

function PasswordInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 border-0 text-muted-foreground hover:text-[#1A1A2E]"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}

export default function PasswordCreationPage() {
  const router = useRouter()
  const { state, update } = useRegistration()
  const [confirm, setConfirm] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const { password, termsAccepted } = state

  const ruleResults = PASSWORD_RULES.map(r => ({ ...r, met: r.test(password) }))
  const allRulesMet = ruleResults.every(r => r.met)
  const passwordsMatch = password.length > 0 && password === confirm
  const canContinue = allRulesMet && passwordsMatch && termsAccepted

  return (
    <>
      {showSuccess && (
        <SuccessModal
          onClose={() => setShowSuccess(false)}
          onContinue={() => router.replace('/register/individual/verify')}
        />
      )}

      <OnboardingShell
        title="Create your password"
        breadcrumb="Sign up / Create your personal account / Password Creation"
        progress={54}
        currentStep={2}
        steps={STEPS}
      >
        <h2 className="text-2xl font-bold text-npf-blue">Secure your account</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Make sure your account is strong and memorable
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <FieldLabel>Password</FieldLabel>
            <PasswordInput
              placeholder="Enter password"
              value={password}
              onChange={v => update({ password: v })}
            />
          </div>

          <div>
            <FieldLabel>Confirm password</FieldLabel>
            <PasswordInput
              placeholder="Enter password"
              value={confirm}
              onChange={setConfirm}
            />
            {confirm.length > 0 && !passwordsMatch && (
              <p className="mt-1.5 text-xs text-red-500">Passwords do not match</p>
            )}
          </div>

          <div className="rounded-lg bg-gray-50 px-4 py-4">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Password must contain</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
              {ruleResults.map(rule => (
                <div key={rule.key} className="flex items-center gap-2">
                  <Check
                    className={cn(
                      'h-3.5 w-3.5 shrink-0 transition-colors duration-300',
                      rule.met ? 'text-npf-green' : 'text-muted-foreground/40',
                    )}
                    strokeWidth={3}
                  />
                  <span
                    className={cn(
                      'text-xs transition-colors duration-300',
                      rule.met ? 'text-[#1A1A2E]' : 'text-muted-foreground',
                    )}
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <div className="relative mt-0.5 flex-shrink-0">
              <div
                className={cn(
                  'flex h-4 w-4 items-center justify-center rounded border-2 transition-colors duration-200',
                  termsAccepted ? 'border-npf-blue bg-npf-blue' : 'border-muted-foreground/40 bg-white',
                )}
                onClick={() => update({ termsAccepted: !termsAccepted })}
              >
                {termsAccepted && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
              </div>
            </div>
            <div onClick={() => update({ termsAccepted: !termsAccepted })}>
              <span className="text-sm font-medium text-[#1A1A2E]">Accept terms and conditions</span>
              <p className="text-xs text-muted-foreground">
                You agree to our{' '}
                <span className="cursor-pointer text-npf-blue hover:underline">Terms of Service</span>
                {' '}and{' '}
                <span className="cursor-pointer text-npf-blue hover:underline">Privacy Policy</span>.
              </p>
            </div>
          </label>

          <div className="flex items-center gap-3 pt-2">
            <Button
              className="flex-1 rounded-full disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"
              disabled={!canContinue}
              onClick={() => setShowSuccess(true)}
            >
              Continue
            </Button>
            {!showSuccess && (
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-full"
                onClick={() => router.back()}
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </OnboardingShell>
    </>
  )
}
