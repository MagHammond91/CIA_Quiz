"use client"

import { SchoolHeader } from "@/components/school-header"
import { WelcomeForm } from "@/components/quiz/welcome-form"
import Link from "next/link"
import { Lock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SchoolHeader subtitle="Online Assessment Portal" />

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <WelcomeForm />
      </main>

      <footer className="border-t border-border bg-card px-4 py-4 text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <Lock className="h-3 w-3" />
          Teacher Dashboard
        </Link>
      </footer>
    </div>
  )
}
