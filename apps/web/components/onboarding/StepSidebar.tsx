'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  label: string
}

interface StepSidebarProps {
  currentStep: number
  steps: Step[]
  mobile?: boolean
}

function StepCircle({
  stepNum,
  isActive,
  isDone,
  size = 'md',
}: {
  stepNum: number
  isActive: boolean
  isDone: boolean
  size?: 'sm' | 'md'
}) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-semibold',
        'transition-all duration-500 ease-in-out',
        size === 'md' ? 'h-9 w-9 text-sm' : 'h-7 w-7 text-xs',
        isDone
          ? 'bg-npf-green text-white'
          : isActive
            ? 'bg-npf-blue text-white'
            : 'border-2 border-muted-foreground/30 text-muted-foreground',
      )}
    >
      <span
        className={cn(
          'transition-all duration-300',
          isDone ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
          'absolute',
        )}
      >
        {stepNum}
      </span>
      <span
        className={cn(
          'transition-all duration-300',
          isDone ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          'absolute',
        )}
      >
        <Check className={size === 'md' ? 'h-4 w-4' : 'h-3 w-3'} strokeWidth={3} />
      </span>
    </div>
  )
}

export function StepSidebar({ currentStep, steps, mobile = false }: StepSidebarProps) {
  if (mobile) {
    return (
      <div className="mb-8 flex items-center gap-0 overflow-hidden md:hidden">
        {steps.map((step, index) => {
          const stepNum = index + 1
          const isActive = stepNum === currentStep
          const isDone = stepNum < currentStep

          return (
            <div key={stepNum} className="flex shrink-0 items-center">
              <div className="flex shrink-0 items-center gap-2">
                <div className="relative flex h-7 w-7 items-center justify-center">
                  <StepCircle stepNum={stepNum} isActive={isActive} isDone={isDone} size="sm" />
                </div>
                <span
                  className={cn(
                    'whitespace-nowrap text-sm transition-colors duration-300',
                    isActive
                      ? 'font-semibold text-npf-blue'
                      : isDone
                        ? 'text-npf-green'
                        : 'text-muted-foreground',
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="mx-3 h-px w-8 shrink-0 bg-border" />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="hidden w-[200px] shrink-0 flex-col md:flex">
      {steps.map((step, index) => {
        const stepNum = index + 1
        const isActive = stepNum === currentStep
        const isDone = stepNum < currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={stepNum} className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <StepCircle stepNum={stepNum} isActive={isActive} isDone={isDone} size="md" />
              </div>
              <span
                className={cn(
                  'text-sm leading-tight transition-colors duration-300',
                  isActive
                    ? 'font-semibold text-[#1A1A2E]'
                    : isDone
                      ? 'font-medium text-npf-green'
                      : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  'ml-[17px] h-8 w-px transition-colors duration-500',
                  isDone ? 'bg-npf-green/40' : 'bg-border',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
