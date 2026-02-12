"use client"

import { GraduationCap } from "lucide-react"

interface SchoolHeaderProps {
  subtitle?: string
}

export function SchoolHeader({ subtitle }: SchoolHeaderProps) {
  return (
    <header className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 md:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h1 className="text-balance text-lg font-bold leading-tight tracking-tight md:text-xl">
            Cornerstone International Academy
          </h1>
          {subtitle && (
            <p className="text-sm text-primary-foreground/80">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  )
}
