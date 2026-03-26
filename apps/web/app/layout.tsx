import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'POSSAP — Nigerian Police Permit Portal',
  description: 'Apply for Nigerian Police permits online. Apply. Track. Get Approved.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
