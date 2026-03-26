import { StepSidebar } from '@/components/onboarding/StepSidebar'

interface Step {
  label: string
}

interface OnboardingShellProps {
  title: string
  breadcrumb: string
  progress: number
  currentStep: number
  steps: Step[]
  children: React.ReactNode
}

export function OnboardingShell({
  title,
  breadcrumb,
  progress,
  currentStep,
  steps,
  children,
}: OnboardingShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* ── Header ── */}
      <header className="border-b border-border bg-white px-6 py-4 md:px-10">
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex items-start justify-between gap-3">
            <span className="shrink-0 text-left text-sm text-muted-foreground">
              Sign up
            </span>
            <button
              type="button"
              className="shrink-0 whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-[#1A1A2E]"
            >
              Save and continue later
            </button>
          </div>
          <h1 className="break-words text-center text-sm font-semibold leading-snug text-[#1A1A2E]">
            {title}
          </h1>
        </div>
        <div className="hidden items-center justify-between md:flex">
          <span className="text-sm text-muted-foreground">{breadcrumb}</span>
          <h1 className="text-base font-semibold text-[#1A1A2E]">{title}</h1>
          <button
            type="button"
            className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-[#1A1A2E]"
          >
            Save and continue later
          </button>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="relative h-1.5 w-full bg-gray-100">
        <div
          className="h-full bg-npf-blue transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute -bottom-3 flex h-6 items-center rounded-full border border-border bg-white px-2 text-xs font-medium text-[#1A1A2E] shadow-sm transition-all duration-700 ease-in-out"
          style={{ left: `calc(${progress}% - 20px)` }}
        >
          {progress}%
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex px-6 py-10 md:px-16 md:py-12">
        <StepSidebar currentStep={currentStep} steps={steps} />
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-2xl">
            <StepSidebar currentStep={currentStep} steps={steps} mobile />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
