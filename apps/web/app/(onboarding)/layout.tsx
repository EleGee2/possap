import { RegistrationProvider } from '@/lib/registration-context'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <RegistrationProvider>{children}</RegistrationProvider>
}
