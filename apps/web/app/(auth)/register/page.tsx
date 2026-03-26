'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Briefcase } from 'lucide-react'
import { RadioGroup } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { AccountTypeCard } from '@/components/auth/AccountTypeCard'

type AccountType = 'INDIVIDUAL' | 'CORPORATE' | null

export default function RegisterAccountTypePage() {
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType>(null)

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl bg-white px-8 py-10 shadow-md">

        {/* Card header */}
        <div className="mb-6 space-y-1">
          <h1 className="text-xl font-bold leading-snug text-[#1A1A2E]">
            What kind of account do you want to open?
          </h1>
          <p className="text-sm text-muted-foreground">
            Select the use case that matches your needs.
          </p>
        </div>

        {/* Account type selection */}
        <RadioGroup
          value={accountType ?? ''}
          onValueChange={(val) => setAccountType(val as AccountType)}
          className="space-y-3"
        >
          <AccountTypeCard
            id="type-individual"
            value="INDIVIDUAL"
            label="Individual"
            icon={User}
            selected={accountType === 'INDIVIDUAL'}
          />
          <AccountTypeCard
            id="type-corporate"
            value="CORPORATE"
            label="Corporate / NGOs"
            icon={Briefcase}
            selected={accountType === 'CORPORATE'}
          />
        </RadioGroup>

        {/* CTA */}
        <Button
          className="mt-8 w-full rounded-full disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"
          disabled={!accountType}
          onClick={() => {
            if (!accountType) return
            router.push(`/register/${accountType.toLowerCase()}/details`)
          }}
        >
          Get started
        </Button>

        {/* Sign in link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-npf-blue hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
