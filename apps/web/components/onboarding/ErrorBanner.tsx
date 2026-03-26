'use client'

import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorBannerProps {
  show: boolean
  title?: string
  message: string
  duration?: number
  onDismiss?: () => void
}

export function ErrorBanner({
  show,
  title = 'Action Required',
  message,
  duration = 4000,
  onDismiss,
}: ErrorBannerProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!show) return

    setMounted(true)
    // Let the DOM mount first, then trigger the slide-in
    const enterFrame = requestAnimationFrame(() => setVisible(true))

    const hideTimer = setTimeout(() => {
      setVisible(false)
    }, duration)

    const unmountTimer = setTimeout(() => {
      setMounted(false)
      onDismiss?.()
    }, duration + 350) // wait for slide-out to finish

    return () => {
      cancelAnimationFrame(enterFrame)
      clearTimeout(hideTimer)
      clearTimeout(unmountTimer)
    }
  }, [show, duration, onDismiss])

  if (!mounted) return null

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-5 z-50 mx-auto w-full max-w-sm px-4',
        'transition-all duration-300 ease-in-out',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
      )}
    >
      <div className="flex gap-3 rounded-xl bg-red-50 p-4 shadow-lg ring-1 ring-red-100">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-4 w-4 text-red-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-600">{title}</p>
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  )
}
