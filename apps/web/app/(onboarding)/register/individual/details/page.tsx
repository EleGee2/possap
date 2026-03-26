'use client'

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OnboardingShell } from '@/components/onboarding/OnboardingShell'
import { ErrorBanner } from '@/components/onboarding/ErrorBanner'
import { NIGERIAN_STATES, LGAS_BY_STATE, ID_TYPES } from '@/lib/nigeria-data'
import { COUNTRY_CODES, type CountryCode } from '@/lib/country-codes'
import { useRegistration } from '@/lib/registration-context'
import { cn } from '@/lib/utils'

const STEPS = [
  { label: 'Personal Information' },
  { label: 'Password Creation' },
  { label: 'Email verification' },
]

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-[#1A1A2E]">
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  )
}

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = 'Please select one',
  disabled,
  className,
}: {
  label: string
  required?: boolean
  value: string
  onChange?: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange?.(e.target.value)}
          disabled={disabled}
          className={cn(
            'h-11 w-full appearance-none rounded-lg border border-input bg-white px-3 pr-9 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-ring',
            'disabled:bg-muted disabled:cursor-not-allowed',
            !value && 'text-muted-foreground',
          )}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="text-[#1A1A2E]">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}

function PhoneInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [selected, setSelected] = useState<CountryCode>(COUNTRY_CODES[0])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const filtered = search.trim()
    ? COUNTRY_CODES.filter(
        c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.includes(search),
      )
    : COUNTRY_CODES

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) {
      setOpen(false)
      setSearch('')
    }
  }

  const handleSelect = (c: CountryCode) => {
    setSelected(c)
    setOpen(false)
    setSearch('')
  }

  const handleOpen = () => {
    setOpen(true)
    setTimeout(() => searchRef.current?.focus(), 50)
  }

  return (
    <div
      ref={ref}
      className="relative flex h-11 w-full items-center rounded-lg border border-input bg-white px-3 text-sm focus-within:ring-2 focus-within:ring-ring"
      onBlur={handleBlur}
    >
      {/* Country code trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className="flex shrink-0 items-center gap-1.5 border-0 pr-3 text-sm"
      >
        <span>{selected.flag}</span>
        <span className="text-[#1A1A2E]">{selected.code}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <div className="h-5 w-px shrink-0 bg-border" />

      <input
        type="tel"
        placeholder="Enter phone number"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="ml-3 flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 w-72 overflow-hidden rounded-lg border border-border bg-white shadow-lg">
          <div className="border-b border-border p-2">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search country or code..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-md border border-input px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-center text-sm text-muted-foreground">No results</p>
            ) : (
              filtered.map(c => (
                <button
                  key={`${c.name}-${c.code}`}
                  type="button"
                  onClick={() => handleSelect(c)}
                  className={cn(
                    'flex w-full items-center gap-2.5 border-0 px-3 py-2.5 text-left text-sm hover:bg-gray-50',
                    selected.name === c.name && 'bg-gray-50 font-medium',
                  )}
                >
                  <span className="text-base">{c.flag}</span>
                  <span className="flex-1 text-[#1A1A2E]">{c.name}</span>
                  <span className="shrink-0 text-muted-foreground">{c.code}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function IndividualDetailsPage() {
  const router = useRouter()
  const { state, update } = useRegistration()

  const { idType, idNumber, lookupStatus, firstName, lastName, dob, gender,
          phone, email, residentialState, lga, address } = state

  const lgaOptions = residentialState ? (LGAS_BY_STATE[residentialState] ?? []) : []

  const handleIdLookup = useCallback(async () => {
    if (!idType || idNumber.length < 6) return
    update({ lookupStatus: 'loading' })
    await new Promise(r => setTimeout(r, 800))
    if (idNumber === '0000000000') {
      update({ lookupStatus: 'error', firstName: '', lastName: '', dob: '', gender: '' })
    } else {
      update({
        lookupStatus: 'success',
        firstName: 'Adebayo',
        lastName: 'Okafor',
        dob: '14 / 05 / 1990',
        gender: 'male',
      })
    }
  }, [idType, idNumber, update])

  const canContinue = Boolean(
    idType && idNumber && lookupStatus === 'success' &&
    phone && email && residentialState && lga && address
  )

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <OnboardingShell
      title="Create your personal account"
      breadcrumb="Sign up / Create your personal account"
      progress={26}
      currentStep={1}
      steps={STEPS}
    >
      <ErrorBanner
        show={lookupStatus === 'error'}
        message="We couldn't find your details. Check your ID number and try again"
        onDismiss={() => update({ lookupStatus: 'idle' })}
      />

      <h2 className="text-2xl font-bold text-npf-blue">Give us more details about you</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Make sure this matches your ID for verification
      </p>

      <div className="mt-8 space-y-5">
        <SelectField
          label="Identification Type"
          value={idType}
          onChange={v => update({
            idType: v,
            lookupStatus: 'idle',
            firstName: '', lastName: '', dob: '', gender: '',
          })}
          options={ID_TYPES}
        />

        <div>
          <FieldLabel required>Identification Number</FieldLabel>
          <Input
            placeholder="Enter ID number"
            value={idNumber}
            onChange={e => {
              update({ idNumber: e.target.value })
              if (lookupStatus !== 'idle') {
                update({ lookupStatus: 'idle', firstName: '', lastName: '', dob: '', gender: '' })
              }
            }}
            onBlur={handleIdLookup}
            className={cn(lookupStatus === 'loading' && 'animate-pulse bg-muted')}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel>First Name</FieldLabel>
            <Input placeholder="Auto-populated by system" value={firstName} readOnly className="bg-gray-50" />
          </div>
          <div>
            <FieldLabel>Last Name</FieldLabel>
            <Input placeholder="Auto-populated by system" value={lastName} readOnly className="bg-gray-50" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel>Date of birth</FieldLabel>
            <Input placeholder="Auto-populated by system" value={dob} readOnly className="bg-gray-50" />
          </div>
          <SelectField
            label="Gender"
            value={gender}
            options={genderOptions}
            placeholder="Auto-populated by system"
            disabled
            className="[&_select]:bg-gray-50"
          />
        </div>

        <div>
          <FieldLabel required>Phone Number</FieldLabel>
          <PhoneInput value={phone} onChange={v => update({ phone: v })} />
        </div>

        <div>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={e => update({ email: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            label="Residential state"
            value={residentialState}
            onChange={v => update({ residentialState: v, lga: '' })}
            options={NIGERIAN_STATES}
          />
          <SelectField
            label="LGA"
            value={lga}
            onChange={v => update({ lga: v })}
            options={lgaOptions}
            disabled={!residentialState}
          />
        </div>

        <div>
          <FieldLabel>Residential address</FieldLabel>
          <Input
            placeholder="Enter residential address"
            value={address}
            onChange={e => update({ address: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            className="flex-1 rounded-full disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"
            disabled={!canContinue}
            onClick={() => router.push('/register/individual/password')}
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
      </div>
    </OnboardingShell>
  )
}
