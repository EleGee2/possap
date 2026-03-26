'use client'

import { cn } from '@/lib/utils'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import type { LucideIcon } from 'lucide-react'

interface AccountTypeCardProps {
  id: string
  value: string
  label: string
  icon: LucideIcon
  selected: boolean
}

export function AccountTypeCard({
  id,
  value,
  label,
  icon: Icon,
  selected,
}: AccountTypeCardProps) {
  return (
    <Label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center gap-4 rounded-lg border-2 px-4 py-4 transition-all duration-150',
        selected
          ? 'border-npf-blue bg-npf-blue/5 shadow-sm'
          : 'border-border bg-white hover:border-npf-blue/40 hover:bg-slate-50'
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          selected ? 'bg-npf-blue/10' : 'bg-slate-100'
        )}
      >
        <Icon
          className={cn(
            'h-5 w-5',
            selected ? 'text-npf-blue' : 'text-slate-500'
          )}
        />
      </div>

      {/* Label */}
      <span
        className={cn(
          'flex-1 text-sm font-medium',
          selected ? 'text-npf-blue' : 'text-[#1A1A2E]'
        )}
      >
        {label}
      </span>

      {/* Radio indicator */}
      <RadioGroupItem value={value} id={id} className="shrink-0" />
    </Label>
  )
}
